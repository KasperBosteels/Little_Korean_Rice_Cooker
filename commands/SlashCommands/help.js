const { SlashCommandBuilder } = require("discord.js");
const { category } = require("../ask");
const help = require("../helpV2");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A handy guide for the bot.")
    .setDefaultPermission(true),
  async execute(client, interaction, con) {
    await help.execute(client, interaction, [], null, null, null);
  },
};
