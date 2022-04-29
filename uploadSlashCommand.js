const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9"); //#endregion
module.exports = {
  async execute(slashcommands, token) {
    const rest = new REST({ version: "9" }).setToken(token);
    const guildid = "927741496738869298";
    const clientId = "742037772503744582";
    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(clientId), {
          body: slashcommands,
        });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
