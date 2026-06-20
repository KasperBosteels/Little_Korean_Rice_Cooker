const dataHandler = require("./DataHandlers/llamaMessageHistory.js");
const aiModelHandler = require("./DataHandlers/aiModelHandler.js");
require("dotenv").config();

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
        const trigger50 = oneInFifty();
        const trigger20 = oneInTwenty();

        if (!message.mentions.everyone && (isMentioned || isReplyToBot || trigger50 || isDM)) {
            return await live(message, trigger50 || trigger20, trigger20);
        }
    },
};
async function live(message, useContext, shouldReply) {
    await message.channel.sendTyping();
    let guildId = message.guild == null ? "1" : message.guild.id

    // Prepare current message
    let m = `${message.author.username}: ` + message.content;
    message.mentions.users.forEach(mention => {
        const reg = new RegExp(`<@!?${mention.id}>`, 'g');
        m = m.replace(reg, mention.username);
    });
    dataHandler.ADD(message.author.id, guildId, message.channel.id, "user", m);

    // Fetch the last couple of messages for context if allowed
    let contextMessages = [];
    if (useContext) {
        try {
            const fetched = await message.channel.messages.fetch({ limit: 10 });
            fetched.reverse().forEach(msg => {
                // Add a check - only add username prefix for USER messages, NOT assistant messages
                const isBot = msg.author.id === message.client.user.id;

                let content = msg.content;
                msg.mentions.users.forEach(user => {
                    const reg = new RegExp(`<@!?${user.id}>`, 'g');
                    content = content.replace(reg, user.username);
                });
                contextMessages.push({
                    role: isBot ? "assistant" : "user",
                    content: isBot ? content : `${msg.author.username}: ${content}`
                });
            });
        } catch (err) {
            console.error("Error fetching context messages:", err);
        }

        // If fetch failed or returned nothing, fallback to dataHandler
        if (contextMessages.length === 0) {
            contextMessages = dataHandler.GET(message.author.id, guildId, message.channel.id);
            if (contextMessages) {
                contextMessages = contextMessages.slice(-10);
            }
        }
    }

    // If we're not using context, or context retrieval failed, use ONLY the current message
    if (!contextMessages || contextMessages.length === 0) {
        contextMessages = [{
            role: "user",
            content: m
        }];
    }

    const customModel = aiModelHandler.get();
    const modelToUse = customModel || process.env.LLama_MODEL;

    let body = {
        "model": modelToUse,
        "messages": contextMessages,
        "stream": false,
        "keep_alive": "48h"
    }
    return await fetch(process.env.LLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json()
            dataHandler.ADD(message.author.id, guildId, message.channel.id, result.message.role, result.message.content)
            if (shouldReply) {
                message.reply({ content: result.message.content })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                message.channel.send({ content: result.message.content })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
}
function oneInTwenty() {
    return Math.random() < 1 / 20;
}

function oneInFifty() {
    return Math.random() < 1 / 50;

}