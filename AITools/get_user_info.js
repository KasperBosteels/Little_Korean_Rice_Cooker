module.exports = {
    name: "get_user_info",
    definition: {
        type: "function",
        function: {
            name: "get_user_info",
            description: "Get detailed information about a specific user or the message author.",
            parameters: {
                type: "object",
                properties: {
                    user_id: {
                        type: "string",
                        description: "The ID of the user to look up. If omitted, provides info about the person sending the message."
                    }
                }
            }
        }
    },
    async execute(message, args) {
        try {
            const userId = args.user_id || message.author.id;
            const guild = message.guild;
            
            let user;
            let member;
            
            if (guild) {
                // Try to get member from cache/fetch for server-specific data
                member = await guild.members.fetch(userId).catch(() => null);
                if (member) user = member.user;
            }
            
            if (!user) {
                // Fallback to global user fetch
                user = await message.client.users.fetch(userId).catch(() => null);
            }
            
            if (!user) return "Error: User not found.";
            
            const info = {
                username: user.tag || user.username,
                id: user.id,
                bot: user.bot,
                createdAt: user.createdAt,
            };
            
            if (member) {
                info.nickname = member.nickname;
                info.joinedAt = member.joinedAt;
                info.premiumSince = member.premiumSince;
                info.roles = member.roles.cache
                    .filter(r => r.name !== "@everyone")
                    .map(r => r.name);
                info.highestRole = member.roles.highest.name;
                info.permissions = member.permissions.toArray();
            }
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested info for user: ${user.username}`);
            return JSON.stringify(info);
        } catch (err) {
            console.error("Tool get_user_info failed:", err);
            return "Error: Failed to fetch user information.";
        }
    }
};
