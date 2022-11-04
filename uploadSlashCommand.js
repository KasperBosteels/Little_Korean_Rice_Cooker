const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9"); //#endregion
module.exports = {
  async execute(token, client) {
    client.slashCommands = new Collection();
    const cmdFiles = fs.readdirSync("./commands/SlashCommands/");
    const rest = new REST({ version: 10 }).setToken(token);
    const commands = [];
    for (const file of cmdFiles) {
      const cmd = require(`./commands/SlashCommands/${file}`);
      commands.push({
        name: cmd.name,
        description: cmd.description,
        type: cmd.type,
        options: cmd.options ? cmd.options : null,
        default_permissions: cmd.default_permissions
          ? default_permissions
          : null,
        default_member_permissions: cmd.default_member_permissions
          ? PermissionsBitField.resolve(
              cmd.default_member_permissions
            ).toString()
          : null,
      });
      if (cmd.name) {
        client.slashcommands.set(cmd.name, cmd);
      } else {
        console.log(`failed to load ${file.split(".js")[0]}`);
      }
    }
    const guildid = "927741496738869298";
    const clientId = "742037772503744582";
    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationGuildCommands(clientId, guildid), {
          body: slashcommands,
        });
        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
