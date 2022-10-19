const { SlashCommandBuilder } = require("discord.js");
const { category } = require("../ask");
const help = require("../helpV2");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A handy guide for the bot.")
    .setDefaultPermission(true),
  /*    
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select a specific help category.")
        .setRequired(false)
        .addChoices(
          { name: "Index", value: "1" },
          { name: "General", value: "2" },
          { name: "Fun", value: "3" },
          { name: "Music", value: "4" },
          { name: "Moderating", value: "5" },
          { name: "Configuration", value: "6" }
        )
    ),
    */
  async execute(client, interaction, con) {
    /*const cat = interaction.options.getString("category");
    if (cat) {
      await help.execute(client, interaction, [cat], null, null, null);
    }
    */
    await help.execute(client, interaction, [], null, null, null);
  },
};
