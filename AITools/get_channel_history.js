module.exports = {
    name: "get_channel_history",
    definition: {
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
    },
    async execute(message, args) {
        const limit = args.limit || 10;
        console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested channel history (limit: ${limit})`);
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
};
