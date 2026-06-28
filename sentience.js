const { callOllama } = require("./DataHandlers/ollamaClient.js");
const dataHandler = require("./DataHandlers/llamaMessageHistory.js");
const aiModelHandler = require("./DataHandlers/aiModelHandler.js");
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

async function live(message, shouldReply, client) {
    await message.channel.sendTyping();
    let guildId = message.guild == null ? "1" : message.guild.id

    // Prepare current message
    let m = `${message.author.username}: ` + message.content;
    message.mentions.users.forEach(mention => {
        const reg = new RegExp(`<@!?${mention.id}>`, 'g');
        m = m.replace(reg, mention.username);
    });
    
    // Save to local history
    dataHandler.ADD(message.author.id, guildId, message.channel.id, "user", m);

    // Initial context: Use conversation history (system message is handled by Ollama)
    let messages = [];
    
    const historyEntry = dataHandler.GET_ENTRY(message.author.id, guildId, message.channel.id);
    if (historyEntry) {
        if (historyEntry.summary) {
            messages.push({ role: "system", content: "Brief memory of earlier conversation: " + historyEntry.summary });
        }
        // Send last 8 messages as immediate context
        messages.push(...historyEntry.Messages.slice(-8));
    } else {
        messages = [{ role: "user", content: m }];
    }

    const customModel = aiModelHandler.get();
    const modelToUse = customModel || process.env.LLama_MODEL;

    try {
        let response = await callOllama(modelToUse, messages, tools);
        
        // Diagnostic log: Did we get a tool call?
        if (response.message.tool_calls && response.message.tool_calls.length > 0) {
            console.log(`\x1b[35m[AI Response]\x1b[0m Received ${response.message.tool_calls.length} tool calls.`);
        } else if (response.message.content) {
             // console.log(`\x1b[35m[AI Response]\x1b[0m Received text response.`);
        }

        // Handle tool calls loop (up to 3 iterations)
        for (let i = 0; i < 3; i++) {
            let toolCalls = response.message.tool_calls || [];
            
            // Fallback: Check if AI output tool call as plain text (common in smaller models)
            if (toolCalls.length === 0 && response.message.content && response.message.content.includes("{")) {
                const detected = findToolCall(response.message.content, aiTools, client);
                if (detected) {
                    console.log(`\x1b[33m[AI Hallucinated Tool Call]\x1b[0m Intercepted ${detected.type} call for ${detected.name}.`);
                    
                    if (detected.type === 'ai_tool') {
                        toolCalls = [{
                            id: "call_" + Math.random().toString(36).substring(2, 9),
                            function: {
                                name: detected.name,
                                arguments: detected.parsed.parameters || detected.parsed.arguments || detected.parsed.function?.arguments || {}
                            }
                        }];
                    } else if (detected.type === 'bot_command') {
                        // Redirect to trigger_command
                        let cmdArgs = "";
                        const p = detected.parsed.parameters || detected.parsed.arguments || detected.parsed.function?.arguments || {};
                        if (typeof p === 'object') {
                            cmdArgs = Object.values(p).filter(v => v !== null && v !== undefined).join(" ");
                        } else if (typeof p === 'string') {
                            cmdArgs = p;
                        }

                        toolCalls = [{
                            id: "call_" + Math.random().toString(36).substring(2, 9),
                            function: {
                                name: "trigger_command",
                                arguments: {
                                    command_name: detected.name,
                                    arguments: cmdArgs
                                }
                            }
                        }];
                    } else {
                        // Unknown tool but looks like one - intercept to hide from user
                         toolCalls = [{
                            id: "call_" + Math.random().toString(36).substring(2, 9),
                            function: {
                                name: detected.name,
                                arguments: detected.parsed.parameters || detected.parsed.arguments || {}
                            }
                        }];
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
                response = await callOllama(modelToUse, messages, tools);
            } else {
                break;
            }
        }

        const finalContent = response.message.content;
        if (finalContent) {
            dataHandler.ADD(message.author.id, guildId, message.channel.id, "assistant", finalContent);
            
            if (shouldReply) {
                await message.reply({ content: finalContent }).catch(console.error);
            } else {
                await message.channel.send({ content: finalContent }).catch(console.error);
            }
        }

    } catch (err) {
        console.error("Error in sentience live loop:", err);
    }
}

function oneInAThousand() {
    return Math.random() < 1 / 1000;
}

/**
 * Finds and parses a hallucinated tool call in the AI's text response.
 * Supports both AI tools and redirection to bot commands.
 */
function findToolCall(content, aiTools, client) {
    if (!content || !content.includes("{")) return null;

    // Try to extract JSON blocks
    const jsonBlocks = content.match(/\{[\s\S]*?\}/g);
    if (!jsonBlocks) return null;

    for (const block of jsonBlocks) {
        try {
            const parsed = JSON.parse(block);
            
            // Standard tool call structure (AI often hallucinates these)
            let toolName = parsed.name || (parsed.function && parsed.function.name);
            if (!toolName && parsed.type === "function" && parsed.function) {
                toolName = parsed.function.name;
            }

            if (!toolName) continue;

            // 1. Is it a supported AI tool?
            if (aiTools.has(toolName)) {
                return { type: 'ai_tool', name: toolName, block, parsed };
            }

            // 2. Is it a bot command? (AI trying to use a command as a tool)
            const command = client.commands.get(toolName.toLowerCase()) || 
                          client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(toolName.toLowerCase()));
            
            if (command) {
                return { type: 'bot_command', name: command.name, block, parsed };
            }

            // 3. Generic detection: if it has "name" and looks like a tool call, treat it as unknown tool
            // This ensures we at least hide the raw JSON from the user.
            if (parsed.name && (parsed.parameters || parsed.arguments || Object.keys(parsed).length <= 3)) {
                 return { type: 'unknown_tool', name: toolName, block, parsed };
            }

        } catch (e) {
            // Not valid JSON block, skip
        }
    }
    return null;
}