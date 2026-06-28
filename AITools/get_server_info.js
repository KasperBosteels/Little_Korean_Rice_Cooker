module.exports = {
    name: "get_server_info",
    definition: {
        type: "function",
        function: {
            name: "get_server_info",
            description: "Get general information about the current Discord server (guild).",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    async execute(message, args) {
        try {
            const guild = message.guild;
            if (!guild) return "This command can only be used in a server (guild).";
            
            const info = {
                name: guild.name,
                id: guild.id,
                description: guild.description || "No description available",
                memberCount: guild.memberCount,
                ownerId: guild.ownerId,
                createdTimestamp: guild.createdTimestamp,
                preferredLocale: guild.preferredLocale,
                premiumTier: guild.premiumTier,
                premiumSubscriptionCount: guild.premiumSubscriptionCount,
                verificationLevel: guild.verificationLevel,
                joinedAt: message.guild.members.me.joinedAt
            };
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested server info for: ${guild.name}`);
            return JSON.stringify(info);
        } catch (err) {
            console.error("Tool get_server_info failed:", err);
            return "Error: Failed to fetch server information.";
        }
    }
};
