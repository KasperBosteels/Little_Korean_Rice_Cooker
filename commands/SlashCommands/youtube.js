const { SlashCommandBuilder } = require("discord.js");
const search = require("yt-search");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDefaultPermission(true)
    .setDescription("Quickly look up a youtube video.")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("Name of the video you want to show.")
        .setRequired(true)
    ),
  async execute(client, interaction, con) {
    interaction.deferReply();
    const word = interaction.options.getString("search");
    await search(word, function (err, result) {
      if (err) {
        console.log(err);
        return interaction.editReply({
          content:
            "Something went badly. error: 7 <:cookersad:927889427500499006>",
        });
      }
      let videos = result.videos.slice(0, 5);
      interaction.editReply(videos[0].url);
    });
  },
};
