module.exports = {
    name: "trigger_command",
    definition: {
        type: "function",
        function: {
            name: "trigger_command",
            description: "Execute a specific bot command (prefix command) on behalf of the user.",
            parameters: {
                type: "object",
                properties: {
                    command_name: {
                        type: "string",
                        description: "The name of the command to trigger (e.g., 'ping', 'help')."
                    },
                    arguments: {
                        type: "string",
                        description: "The arguments to pass to the command, if any. Space-separated."
                    }
                },
                required: ["command_name"]
            }
        }
    },
    async execute(message, args) {
        try {
            const client = message.client;
            const commandName = args.command_name.toLowerCase();
            const commandArgs = args.arguments ? args.arguments.split(/ +/) : [];
            
            const command = client.commands.get(commandName) || 
                          client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            
            if (!command) {
                return `Error: Prefix command '${commandName}' not found. Use list_commands to see available prefix commands. Note that slash-only commands cannot be triggered this way currently.`;
            }
            
            // Check permissions if the command has them
            if (command.userperms) {
                const member = message.member;
                if (member) {
                    const hasPerms = command.userperms.every(perm => {
                        // Some commands use strings for perms, some use bitfield flags.
                        // We try to handle both or at least not crash.
                        try {
                            return member.permissions.has(perm);
                        } catch (e) {
                            return true; // Fallback
                        }
                    });
                    if (!hasPerms) {
                        return `Error: You do not have required permissions (${command.userperms.join(", ")}) to run this command.`;
                    }
                }
            }

            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI triggering command: ${commandName} with args: ${args.arguments || 'none'}`);
            
            // Execute the command.
            // Prefix commands signature: (client, message, args, con)
            await command.execute(client, message, commandArgs, client.con);
            
            return `Command '${commandName}' was triggered successfully. The output should appear in the channel.`;
        } catch (err) {
            console.error(`Tool trigger_command failed for '${args.command_name}':`, err);
            return `Error: Failed to execute command '${args.command_name}'. ${err.message}`;
        }
    }
};
