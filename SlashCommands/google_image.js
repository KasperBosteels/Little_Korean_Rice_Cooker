const { SlashCommandBuilder } = require("@discordjs/builders");
const google = require("../commands/GoogleV2");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("google")
    .setDescription("Look images up on google.")
    .addStringOption((option) =>
      option.setName("google").setDescription("Something you want to look up.")
    ),
  async execute(client, interaction) {
    await google.execute(
      null,
      interaction,
      [interaction.options.getString("google")],
      null
    );
    return;
  },
};
