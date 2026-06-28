module.exports = {
    name: "get_server_roles",
    definition: {
        type: "function",
        function: {
            name: "get_server_roles",
            description: "List all roles in the current server.",
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
            
            const roles = guild.roles.cache.map(r => ({
                name: r.name,
                id: r.id,
                color: r.hexColor,
                position: r.position,
                managed: r.managed
            }));
            
            // Sort by position (descending)
            roles.sort((a, b) => b.position - a.position);
            
            // Limit to avoid context overflow (max 50)
            const limitedRoles = roles.slice(0, 50);
            
            const result = {
                totalRoles: roles.length,
                roles: limitedRoles
            };
            
            if (roles.length > 50) {
                result.note = "Showing the top 50 roles. Use specific role IDs if needed.";
            }
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested roles for: ${guild.name}`);
            return JSON.stringify(result);
        } catch (err) {
            console.error("Tool get_server_roles failed:", err);
            return "Error: Failed to fetch server roles.";
        }
    }
};
