const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Collection, PermissionsBitField } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  async execute(token, client, collection) {
    client.slashCommands = new Collection();
    const cmdFiles = fs.readdirSync("./commands/SlashCommands/");
    const rest = new REST({ version: 10 }).setToken(token);
    let commands = [];
    for (const file of cmdFiles) {
      const cmd = require(`./commands/SlashCommands/${file}`);
      if (
        !cmd.name ||
        !cmd.description ||
        !cmd.type ||
        !cmd.defaultMemberPermissions
      )
        return console.warn(
          "\x1b[31m",
          `${cmd.name} is not complete`,
          "\x1b[0m"
        );
      commands.push({
        name: cmd.name,
        description: cmd.description,
        type: cmd.type,
        options: cmd.options ? cmd.options : null,
        default_permissions: cmd.default_permissions
          ? default_permissions
          : null,
        defaultMemberPermissions: cmd.defaultMemberPermissions
          ? PermissionsBitField.resolve(cmd.defaultMemberPermissions).toString()
          : null,
        dmPermission: cmd.dmPermission ? cmd.dmPermission : null,
      });
      if (cmd.name) {
        client.slashCommands.set(cmd.name, cmd);
        console.log("\x1b[32m", `loaded ${cmd.name}.js (/)`, "\x1b[0m");
      } else {
        console.log(`failed to load ${file.split(".js")[0]}`);
      }
    }
    const guildid = "927741496738869298";
    const clientId = "742037772503744582";
    (async () => {
      try {
        console.log(
          "\x1b[33m",
          "Started refreshing application (/) commands.",
          "\x1b[0m"
        );
        await rest.put(Routes.applicationGuildCommands(clientId, guildid), {
          body: commands,
        });
        console.log(
          "\x1b[32m",
          "Successfully reloaded application (/) commands.",
          "\x1b[0m"
        );
      } catch (error) {
        if (error.rawError.errors.description)
          console.log(
            "\x1b[31m",
            "Failed to reload application (/) commands.",
            "\x1b[0m"
          );
        console.log(error.rawError.errors.description._errors);
        console.error(error);
      }
    })();
  },
};
