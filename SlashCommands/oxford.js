const { SlashCommandBuilder } = require("@discordjs/builders");
const oxford = require("../commands/oxford");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("oxford")
    .setDescription("Definitions from the oxford api")
    .addStringOption((option) =>
      option.setName("word").setDescription("The word you want to look up.")
    ),
  async execute(client, interaction) {
    await oxford.execute(
      null,
      interaction,
      [interaction.options.getString("word")],
      null
    );
  },
};
