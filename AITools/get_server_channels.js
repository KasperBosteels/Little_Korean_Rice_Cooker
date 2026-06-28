const { ChannelType } = require('discord.js');

module.exports = {
    name: "get_server_channels",
    definition: {
        type: "function",
        function: {
            name: "get_server_channels",
            description: "List the channels available in the current server.",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    async execute(message, args) {
        try {
            const guild = message.guild;
            if (!guild) return "Error: This command can only be used in a server.";
            
            const channels = guild.channels.cache.map(c => ({
                name: c.name,
                id: c.id,
                type: ChannelType[c.type] || "Unknown",
                parentId: c.parentId
            }));
            
            // Limit to avoid context overflow (max 50)
            const limitedChannels = channels.slice(0, 50);
            
            const result = {
                totalChannels: channels.length,
                channels: limitedChannels
            };
            
            if (channels.length > 50) {
                result.note = "Showing the first 50 channels.";
            }
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested channels for: ${guild.name}`);
            return JSON.stringify(result);
        } catch (err) {
            console.error("Tool get_server_channels failed:", err);
            return "Error: Failed to fetch server channels.";
        }
    }
};
