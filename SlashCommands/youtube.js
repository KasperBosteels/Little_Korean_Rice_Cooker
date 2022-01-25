const { SlashCommandBuilder } = require("@discordjs/builders");
const { Options } = require("discord.js");
const yt = require("../commands/youtube");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Quickly look up a youtube video.")
    .addStringOption((option) =>
      option
        .setName("video")
        .setDescription("Name of the video you want to show.")
    ),
  async execute(client, interaction, con) {
    await yt.execute(
      null,
      interaction,
      [interaction.options.getString("video")],
      con,
      null
    );
  },
};
