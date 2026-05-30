const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
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
      // The raw REST endpoint expects the API's snake_case field names;
      // camelCase keys (defaultMemberPermissions/dmPermission) are silently
      // ignored, which is why per-command permissions never took effect.
      const entry = {
        name: cmd.name,
        description: cmd.description,
        type: cmd.type,
      };
      if (cmd.options) entry.options = cmd.options;
      // An empty permissions array means "no restriction" -> omit the field.
      // (Sending "0" would hide the command from everyone except admins.)
      if (Array.isArray(cmd.defaultMemberPermissions) && cmd.defaultMemberPermissions.length > 0) {
        entry.default_member_permissions = PermissionsBitField
          .resolve(cmd.defaultMemberPermissions)
          .toString();
      }
      if (cmd.dmPermission !== undefined && cmd.dmPermission !== null) {
        entry.dm_permission = cmd.dmPermission;
      }
      commands.push(entry);
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
        await rest.put(Routes.applicationCommands(clientId), {
          body: commands,
        });
        console.log(
          "\x1b[32m",
          "Successfully reloaded application (/) commands.",
          "\x1b[0m"
        );
      } catch (error) {
        if (error)
          console.log(
            "\x1b[31m",
            "Failed to reload application (/) commands.",
            "\x1b[0m"
          );
        console.error(error);
        console.log(
          error.rawError.errors.options)
        console.log("options 2 error\n",error.rawError.errors.options["9"]._errors)
          error.requestBody.json.map((j)=>console.log(j))
      }
    })();
  },
};
