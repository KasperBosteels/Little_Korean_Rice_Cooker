const { SlashCommandBuilder } = require("discord.js");
const help = require("../helpV2");
module.exports = {
  name: "help",
  description: "A handy guide for the bot.",
  command: {
    enabled: true,
    slashCommand: {
      enabled: true,
      ephemeral: true,
      dmPermission: true,
    },
  },
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A handy guide for the bot.")
    .setDefaultPermission(true),
  async execute(client, interaction, con) {
    await help.execute(client, interaction, [], null, null, null);
  },
};
