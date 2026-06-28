module.exports = {
    name: "list_commands",
    definition: {
        type: "function",
        function: {
            name: "list_commands",
            description: "List all available bot commands (both prefix and slash commands).",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    async execute(message, args) {
        try {
            const client = message.client;
            
            // Map prefix commands
            const prefixCommands = client.commands.map(cmd => ({
                name: cmd.name,
                description: cmd.description || "No description",
                aliases: cmd.aliases || [],
                usage: cmd.usage || ""
            }));
            
            // Map slash commands
            const slashCommands = client.slashCommands ? client.slashCommands.map(cmd => ({
                name: cmd.name,
                description: cmd.description || "No description"
            })) : [];
            
            const result = {
                prefixCommands,
                slashCommands,
                totalCommands: prefixCommands.length + slashCommands.length
            };
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested available commands list.`);
            return JSON.stringify(result);
        } catch (err) {
            console.error("Tool list_commands failed:", err);
            return "Error: Failed to fetch command list.";
        }
    }
};
