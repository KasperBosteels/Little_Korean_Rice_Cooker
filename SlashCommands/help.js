const { SlashCommandBuilder } = require("@discordjs/builders");
const { category } = require("../commands/ask");
const help = require("../commands/helpV2");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A handy guide for the bot.")
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select a specific help category.")
        .setRequired(false)
        .addChoice("Index", "1")
        .addChoice("General", "2")
        .addChoice("Fun", "3")
        .addChoice("Music", "4")
        .addChoice("Moderating", "5")
        .addChoice("Configuration", "6")
    ),
  async execute(client, interaction, con) {
    const cat = interaction.options.getString("category");
    if (cat) {
      await help.execute(client, interaction, [cat], null, null, null);
    }
    await help.execute(client, interaction, [], null, null, null);
  },
};
