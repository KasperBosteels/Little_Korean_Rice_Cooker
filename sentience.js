const { callOllama } = require("./DataHandlers/ollamaClient.js");
const dataHandler = require("./DataHandlers/llamaMessageHistory.js");
const aiModelHandler = require("./DataHandlers/aiModelHandler.js");
const modelConfig = require("./DataHandlers/modelConfig.js");
const ai_enabled = require("./DataHandlers/ai_enabled.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

// Load AI Tools dynamically
const aiTools = new Map();
const toolFiles = fs.readdirSync("./AITools").filter(file => file.endsWith(".js"));
for (const file of toolFiles) {
    const tool = require(`./AITools/${file}`);
    aiTools.set(tool.name, tool);
    console.log(`\x1b[32m AI tool loaded: ${tool.name} \x1b[0m`);
}

const tools = Array.from(aiTools.values()).map(t => t.definition);

module.exports = {
    async live(message, client) {
        const customModel = aiModelHandler.get();
        const modelToUse = customModel || process.env.LLama_MODEL;

        if (!process.env.LLAMA_URL || !modelToUse) {
            return;
        }
        const isMentioned = message.mentions.has(client.user);
        const isReplyToBot = message.reference && message.mentions.repliedUser?.id === client.user.id;
        const isDM = message.channel.type === 1;

        if (message.guild && !ai_enabled.GET(message.guild.id)) {
            return;
        }

        const trigger50 = oneInAThousand();

        if (!message.mentions.everyone && (isMentioned || isReplyToBot || trigger50 || isDM)) {
            const shouldReply = isMentioned || isReplyToBot;
            return await live(message, shouldReply, client);
        }
    },
};

/**
 * Reads the system prompt from info/system_prompt.txt
 */
function getSystemPrompt() {
    try {
        const promptPath = "./info/system_prompt.txt";
        if (fs.existsSync(promptPath)) {
            return fs.readFileSync(promptPath, "utf8").trim();
        }
    } catch (err) {
        console.error("Error reading system prompt:", err);
    }
    return null;
}

async function live(message, shouldReply, client) {
    await message.channel.sendTyping();
    let guildId = message.guild == null ? "1" : message.guild.id

    // Diagnostic log: check if sentience is triggered
    console.log(`\x1b[36m[Sentience Triggered]\x1b[0m User: ${message.author.username}, Content: "${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}"`);

    const customModel = aiModelHandler.get();
    const modelToUse = customModel || process.env.LLama_MODEL;
    const config = await modelConfig.get(modelToUse);
    console.log(`\x1b[36m[Sentience Config]\x1b[0m Model: ${modelToUse}, use_full_system_prompt: ${config.use_full_system_prompt}`);

    // Prepare current message
    let m = `${config.user_prefix}${message.author.username}${config.user_suffix}` + message.content;
    message.mentions.users.forEach(mention => {
        const reg = new RegExp(`<@!?${mention.id}>`, 'g');
        m = m.replace(reg, mention.username);
    });
    
    // Save to local history
    await dataHandler.ADD(message.author.id, guildId, message.channel.id, "user", m);

    // Initial context: Use conversation history
    let messages = [];
    
    // Combine all system instructions
    let systemInstructions = [];
    
    // Core personality - either from file or a minimal identification
    const systemPrompt = getSystemPrompt();
    if (config.use_full_system_prompt !== false) {
        if (systemPrompt) {
            systemInstructions.push(systemPrompt);
        }
    } else {
        systemInstructions.push("You are Little Korean Rice Cooker. Your personality is defined in your system modelfile.");
    }
    
    // Operational Rules (always include these so the bot knows how to use tools)
    if (systemPrompt && systemPrompt.includes("RULES")) {
        const rulesMatch = systemPrompt.match(/RULES[\s\S]*/i);
        if (rulesMatch) {
            systemInstructions.push(rulesMatch[0]);
        }
    } else {
        // Fallback rules if not found in prompt
        systemInstructions.push("RULES\nWhen you need to use a tool, output ONLY the JSON tool call and NOTHING else in that message.\nNEVER show raw JSON to the user.");
    }
    
    // Add tool list if native tools are disabled for this model
    if (config.use_tools === false) {
        const toolList = Array.from(aiTools.values()).map(t => `- ${t.name}: ${t.definition.function.description}`).join("\n");
        systemInstructions.push(`AVAILABLE TOOLS:\n${toolList}\n\nTo use a tool, output a VALID JSON block exactly like this:\n{"name": "tool_name", "parameters": {"arg": "value"}}`);
    }
    
    // Dynamic context reinforcement
    const now = new Date();
    systemInstructions.push(`Current System Time: ${now.toLocaleString()}.`);
    
    const historyEntry = await dataHandler.GET_ENTRY(message.author.id, guildId, message.channel.id);
    if (historyEntry) {
        if (historyEntry.summary) {
            systemInstructions.push("Brief memory of earlier conversation: " + historyEntry.summary);
        }
        
        if (systemInstructions.length > 0 && config.use_system_role) {
            messages.push({ role: "system", content: systemInstructions.join("\n\n") });
        }
        // Send last 8 messages as immediate context (Clone to avoid modifying cache)
        let history = historyEntry.Messages.slice(-8).map(msg => ({ ...msg }));
        
        // Ensure the conversation context starts with a user message
        while (history.length > 0 && history[0].role !== "user") {
            history.shift();
        }
        
        messages.push(...history);
    } else {
        if (systemInstructions.length > 0 && config.use_system_role) {
            messages.push({ role: "system", content: systemInstructions.join("\n\n") });
        }
        messages.push({ role: "user", content: m });
    }

    // If model doesn't support system role, prepend it to the first user message
    if (!config.use_system_role && systemInstructions.length > 0) {
        const firstUserIndex = messages.findIndex(msg => msg.role === "user");
        if (firstUserIndex !== -1) {
            messages[firstUserIndex].content = `### SYSTEM CONTEXT ###\n${systemInstructions.join("\n\n")}\n\n### USER MESSAGE ###\n${messages[firstUserIndex].content}`;
        }
    }

    // Diagnostic: Log message structure
    console.log(`\x1b[36m[Sentience Context]\x1b[0m Sending ${messages.length} messages. Roles: ${messages.map(m => m.role).join(", ")}`);
    
    try {
        let response;
        try {
            response = await callOllama(modelToUse, messages, tools, config.options);
            console.log(`\x1b[35m[Ollama Response]\x1b[0m Content: "${response.message.content ? response.message.content.substring(0, 50) : 'N/A'}", Tool Calls: ${response.message.tool_calls ? response.message.tool_calls.length : 0}`);
        } catch (err) {
            // Fallback: If 400 Bad Request, try without tools (model might not support them)
            if (err.message.includes("400") || err.message.toLowerCase().includes("bad request")) {
                console.warn(`\x1b[33m[Ollama Warning]\x1b[0m Model ${modelToUse} rejected tools or request. Retrying without tools...`);
                response = await callOllama(modelToUse, messages, null, config.options);
            } else {
                throw err;
            }
        }
        
        // Diagnostic log: Did we get a tool call?
        if (response.message.thinking) {
            console.log(`\x1b[36m[AI Thinking]\x1b[0m ${response.message.thinking.substring(0, 200)}...`);
        }
        if (response.message.tool_calls && response.message.tool_calls.length > 0) {
            console.log(`\x1b[35m[AI Response]\x1b[0m Received ${response.message.tool_calls.length} tool calls.`);
        } else if (response.message.content) {
             // console.log(`\x1b[35m[AI Response]\x1b[0m Received text response.`);
        }

        // Handle tool calls loop (up to 3 iterations)
        for (let i = 0; i < 3; i++) {
            let toolCalls = response.message.tool_calls || [];
            
            // Fallback: Check if AI output tool calls as plain text (common in smaller models)
            if (toolCalls.length === 0 && response.message.content && response.message.content.includes("{")) {
                const detectedTools = findToolCalls(response.message.content, aiTools, client);
                if (detectedTools.length > 0) {
                    for (const detected of detectedTools) {
                        console.log(`\x1b[33m[AI Hallucinated Tool Call]\x1b[0m Intercepted ${detected.type} call for ${detected.name}.`);
                        
                        let toolCall;
                        if (detected.type === 'ai_tool') {
                            toolCall = {
                                id: "call_" + Math.random().toString(36).substring(2, 9),
                                function: {
                                    name: detected.name,
                                    arguments: detected.parsed.parameters || detected.parsed.arguments || detected.parsed.function?.arguments || {}
                                }
                            };
                        } else if (detected.type === 'bot_command') {
                            // Redirect to trigger_command
                            let cmdArgs = "";
                            const p = detected.parsed.parameters || detected.parsed.arguments || detected.parsed.function?.arguments || {};
                            if (typeof p === 'object') {
                                cmdArgs = Object.values(p).filter(v => v !== null && v !== undefined).join(" ");
                            } else if (typeof p === 'string') {
                                cmdArgs = p;
                            }

                            toolCall = {
                                id: "call_" + Math.random().toString(36).substring(2, 9),
                                function: {
                                    name: "trigger_command",
                                    arguments: {
                                        command_name: detected.name,
                                        arguments: cmdArgs
                                    }
                                }
                            };
                        } else {
                            // Unknown tool but looks like one - intercept to hide from user
                             toolCall = {
                                id: "call_" + Math.random().toString(36).substring(2, 9),
                                function: {
                                    name: detected.name,
                                    arguments: detected.parsed.parameters || detected.parsed.arguments || {}
                                }
                            };
                        }
                        
                        if (toolCall) toolCalls.push(toolCall);
                    }
                    
                    if (toolCalls.length > 0) {
                        response.message.tool_calls = toolCalls;
                        response.message.content = "";
                    }
                }
            }

            if (toolCalls.length > 0) {
                // Add assistant's tool call to history
                messages.push(response.message);

                for (const toolCall of toolCalls) {
                    const toolName = toolCall.function.name;
                    let args = toolCall.function.arguments;
                    if (typeof args === 'string') {
                        try { args = JSON.parse(args); } catch (e) { args = {}; }
                    }

                    const tool = aiTools.get(toolName);
                    let result;
                    
                    if (tool) {
                        result = await tool.execute(message, args);
                    } else {
                        console.log(`\x1b[31m[AI Tool Error]\x1b[0m AI tried to call unknown tool: ${toolName}`);
                        result = `Error: Tool '${toolName}' is not available.`;
                    }

                    messages.push({
                        role: "tool",
                        content: result,
                        tool_call_id: toolCall.id || "manual_id"
                    });
                }
                // Get next response from AI after providing tool results
                try {
                    response = await callOllama(modelToUse, messages, tools, config.options);
                    console.log(`\x1b[35m[Ollama Response (Loop)]\x1b[0m Content: "${response.message.content ? response.message.content.substring(0, 50) : 'N/A'}", Tool Calls: ${response.message.tool_calls ? response.message.tool_calls.length : 0}`);
                } catch (err) {
                    if (err.message.includes("400") || err.message.toLowerCase().includes("bad request")) {
                        console.warn(`\x1b[33m[Ollama Warning]\x1b[0m Model ${modelToUse} rejected tools during tool loop. Retrying without tools...`);
                        response = await callOllama(modelToUse, messages);
                    } else {
                        throw err;
                    }
                }
            } else {
                break;
            }
        }

        let finalContent = response.message.content;
        if (finalContent) {
            // Filter out reasoning/thinking blocks
            finalContent = filterThinking(finalContent);
            
            if (finalContent.length > 0) {
                await dataHandler.ADD(message.author.id, guildId, message.channel.id, "assistant", finalContent);
                
                const chunks = splitMessage(finalContent, 2000);
                for (const chunk of chunks) {
                    if (shouldReply) {
                        await message.reply({ content: chunk }).catch(console.error);
                        shouldReply = false; // Only reply to the first chunk, send others as normal messages
                    } else {
                        await message.channel.send({ content: chunk }).catch(console.error);
                    }
                }
            }
        }
        console.log(`\x1b[36m[Sentience Finished]\x1b[0m Response processed.`);

    } catch (err) {
        console.error("Error in sentience live loop:", err);
    }
}

function oneInAThousand() {
    return Math.random() < 1 / 1000;
}

/**
 * Splits a long message into chunks of up to maxLength characters.
 * Tries to split at newlines or spaces to avoid cutting words/sentences.
 */
function splitMessage(text, maxLength = 2000) {
    if (text.length <= maxLength) return [text];
    const chunks = [];
    let current = text;
    while (current.length > 0) {
        if (current.length <= maxLength) {
            chunks.push(current);
            break;
        }
        
        // Try to split at a newline
        let splitIndex = current.lastIndexOf('\n', maxLength);
        
        // If no newline or it's too far back, split at a space
        if (splitIndex === -1 || splitIndex < maxLength * 0.5) {
            splitIndex = current.lastIndexOf(' ', maxLength);
        }
        
        // If no space either, just split at maxLength
        if (splitIndex === -1 || splitIndex < maxLength * 0.5) {
            splitIndex = maxLength;
        }
        
        chunks.push(current.substring(0, splitIndex).trim());
        current = current.substring(splitIndex).trim();
    }
    return chunks.filter(c => c.length > 0);
}

/**
 * Strips reasoning/thinking blocks (e.g. <think>...</think>) from the AI response.
 */
function filterThinking(text) {
    if (!text) return "";
    return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

/**
 * Finds and parses hallucinated tool calls in the AI's text response.
 * Supports both AI tools and redirection to bot commands.
 * Handles multiple tool calls and nested JSON.
 */
function findToolCalls(content, aiTools, client) {
    if (!content || !content.includes("{")) return [];

    const jsonBlocks = extractJSONBlocks(content);
    const detected = [];

    for (const block of jsonBlocks) {
        try {
            let parsed;
            try {
                parsed = JSON.parse(block);
            } catch (e) {
                // Try to repair common AI JSON mistakes
                let repaired = block
                    .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // Quote keys
                    .replace(/:\s*([a-zA-Z0-9_]+)\s*([,}])/g, ':"$1"$2') // Quote unquoted values
                    .replace(/'/g, '"'); // Single to double quotes
                
                try {
                    parsed = JSON.parse(repaired);
                } catch (e2) {
                    // Still failed, but maybe we can extract name/params with regex?
                    const nameMatch = block.match(/"name":\s*"([^"]+)"/) || block.match(/name:\s*([^,}]+)/);
                    if (nameMatch) {
                        const name = nameMatch[1].replace(/"/g, '').trim();
                        if (aiTools.has(name) || name === "trigger_command") {
                            // Extract something that looks like parameters
                            const paramsMatch = block.match(/"parameters":\s*({[^}]+})/) || block.match(/parameters:\s*({[^}]+})/);
                            let parameters = {};
                            if (paramsMatch) {
                                try { parameters = JSON.parse(paramsMatch[1].replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":').replace(/'/g, '"')); } catch(e3){}
                            }
                            parsed = { name, parameters };
                        }
                    }
                }
            }

            if (!parsed || !parsed.name) continue;
            
            // Standard tool call structure (AI often hallucinates these)
            let toolName = parsed.name || (parsed.function && parsed.function.name);
            if (!toolName && parsed.type === "function" && parsed.function) {
                toolName = parsed.function.name;
            }

            if (!toolName) continue;

            // 1. Is it a supported AI tool?
            if (aiTools.has(toolName)) {
                detected.push({ type: 'ai_tool', name: toolName, block, parsed });
                continue;
            }

            // 2. Is it a bot command? (AI trying to use a command as a tool)
            const command = client.commands.get(toolName.toLowerCase()) || 
                          client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(toolName.toLowerCase()));
            
            if (command) {
                detected.push({ type: 'bot_command', name: command.name, block, parsed });
                continue;
            }

            // 3. Generic detection: if it has "name" and looks like a tool call, treat it as unknown tool
            // This ensures we at least hide the raw JSON from the user.
            if (parsed.name && (parsed.parameters || parsed.arguments || Object.keys(parsed).length <= 3)) {
                 detected.push({ type: 'unknown_tool', name: toolName, block, parsed });
            }

        } catch (e) {
            // Not valid JSON block, skip
        }
    }
    return detected;
}

/**
 * Extracts all top-level JSON blocks from a string, handling nested braces and strings.
 */
function extractJSONBlocks(content) {
    const blocks = [];
    let braceCount = 0;
    let startPos = -1;
    let inString = false;
    let escape = false;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        
        // Handle strings to avoid counting braces inside them
        if (char === '"' && !escape) {
            inString = !inString;
        }
        
        if (inString) {
            if (char === '\\' && !escape) {
                escape = true;
            } else {
                escape = false;
            }
            continue;
        }

        // Handle braces
        if (char === '{') {
            if (braceCount === 0) startPos = i;
            braceCount++;
        } else if (char === '}') {
            braceCount--;
            if (braceCount === 0 && startPos !== -1) {
                blocks.push(content.substring(startPos, i + 1));
                startPos = -1;
            }
        }
    }
    return blocks;
}