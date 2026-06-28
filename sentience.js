const dataHandler = require("./DataHandlers/llamaMessageHistory.js");
const aiModelHandler = require("./DataHandlers/aiModelHandler.js");
const ai_enabled = require("./DataHandlers/ai_enabled.js");
require("dotenv").config();

// Tool definition for Ollama
const tools = [
    {
        type: "function",
        function: {
            name: "get_channel_history",
            description: "Fetch more previous messages from the Discord channel for better context.",
            parameters: {
                type: "object",
                properties: {
                    limit: {
                        type: "integer",
                        description: "Number of messages to fetch (max 30).",
                        default: 10
                    }
                }
            }
        }
    }
];

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
            return await live(message, shouldReply);
        }
    },
};

async function live(message, shouldReply) {
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

    // Initial context: We now send just a tiny bit of local history
    // to reduce unnecessary overhead. The AI can ask for more via tools.
    let messages = [];
    const localHistory = dataHandler.GET(message.author.id, guildId, message.channel.id);
    if (localHistory) {
        // Send last 3 messages as immediate context
        messages = localHistory.slice(-3);
    } else {
        messages = [{ role: "user", content: m }];
    }

    const customModel = aiModelHandler.get();
    const modelToUse = customModel || process.env.LLama_MODEL;

    try {
        let response = await callOllama(modelToUse, messages, true);
        
        // Handle tool calls loop (up to 2 iterations)
        for (let i = 0; i < 2; i++) {
            if (response.message.tool_calls && response.message.tool_calls.length > 0) {
                // Add assistant's tool call to history
                messages.push(response.message);

                for (const toolCall of response.message.tool_calls) {
                    if (toolCall.function.name === "get_channel_history") {
                        const args = typeof toolCall.function.arguments === 'string' 
                            ? JSON.parse(toolCall.function.arguments) 
                            : toolCall.function.arguments;
                        const limit = args.limit || 10;
                        const history = await getChannelHistory(message, limit);
                        
                        messages.push({
                            role: "tool",
                            content: history,
                            tool_call_id: toolCall.id
                        });
                    }
                }
                // Get next response from AI after providing tool results
                response = await callOllama(modelToUse, messages, false);
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

async function callOllama(model, messages, includeTools) {
    const body = {
        model: model,
        messages: messages,
        stream: false,
        keep_alive: "48h"
    };
    
    if (includeTools) {
        body.tools = tools;
    }

    const response = await fetch(process.env.LLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
    }

    return await response.json();
}

async function getChannelHistory(message, limit) {
    try {
        const safeLimit = Math.min(limit, 30);
        const fetched = await message.channel.messages.fetch({ limit: safeLimit });
        const context = [];
        
        fetched.reverse().forEach(msg => {
            const isBot = msg.author.id === message.client.user.id;
            let content = msg.content;
            msg.mentions.users.forEach(user => {
                const reg = new RegExp(`<@!?${user.id}>`, 'g');
                content = content.replace(reg, user.username);
            });
            context.push({
                role: isBot ? "assistant" : "user",
                content: isBot ? content : `${msg.author.username}: ${content}`
            });
        });
        
        return JSON.stringify(context);
    } catch (err) {
        console.error("Tool get_channel_history failed:", err);
        return "Error fetching channel history.";
    }
}

function oneInAThousand() {
    return Math.random() < 1 / 1000;
}