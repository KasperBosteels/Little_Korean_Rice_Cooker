module.exports = {
    name: "get_user_stats",
    definition: {
        type: "function",
        function: {
            name: "get_user_stats",
            description: "Check a user's social credit score, level, and experience points.",
            parameters: {
                type: "object",
                properties: {
                    user_id: {
                        type: "string",
                        description: "The Discord ID of the user. Defaults to the person you are talking to if not provided."
                    }
                }
            }
        }
    },
    async execute(message, args) {
        try {
            const client = message.client;
            const targetId = args.user_id || message.author.id;
            
            // Fetch user from database
            const user = await client.con.manager.findOneBy("User", { user_id: targetId });
            
            if (!user) {
                return `User with ID ${targetId} is not registered in my database yet. They need to send some messages first!`;
            }
            
            // Try to get the member object to get a nice display name
            let displayName = user.user_name || "Unknown User";
            try {
                const member = await message.guild.members.fetch(targetId);
                if (member) displayName = member.displayName;
            } catch (e) {
                // Ignore if we can't fetch member (e.g. DM or left server)
            }

            const result = {
                username: displayName,
                user_id: user.user_id,
                social_credit: parseInt(user.user_score),
                level: parseInt(user.user_level),
                experience: parseInt(user.user_experience),
                is_ignored: user.is_ignored
            };
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI checked stats for user: ${displayName} (${targetId})`);
            return JSON.stringify(result);
        } catch (err) {
            console.error("Tool get_user_stats failed:", err);
            return `Error: Failed to fetch user stats from database. ${err.message}`;
        }
    }
};
