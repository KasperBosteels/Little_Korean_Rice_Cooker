const { SlashCommandBuilder } = require("@discordjs/builders");
const help = require("../commands/helpV2");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A handy guide for the bot."),
  async execute(client, interaction, con) {
    await help.execute(client, interaction, [], null, null, null);
  },
};
