module.exports = {
    name: "get_bot_permissions",
    definition: {
        type: "function",
        function: {
            name: "get_bot_permissions",
            description: "Check what permissions the bot has in the current channel and server.",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    async execute(message, args) {
        try {
            if (!message.guild) return "Direct Message permissions: Send Messages, Read Message History, Attach Files, Embed Links.";
            
            const botMember = message.guild.members.me;
            const channelPermissions = message.channel.permissionsFor(botMember);
            
            if (!channelPermissions) return "Error: Could not determine permissions for this channel.";
            
            const info = {
                channel: message.channel.name,
                permissions: channelPermissions.toArray()
            };
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI checked its permissions in #${message.channel.name}`);
            return JSON.stringify(info);
        } catch (err) {
            console.error("Tool get_bot_permissions failed:", err);
            return "Error: Failed to fetch bot permissions.";
        }
    }
};
