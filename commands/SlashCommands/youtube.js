const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const search = require("yt-search");
module.exports = {
  name: "Youtube",
  description: "Quickly look up a Youtube video.",
  type: ApplicationCommandType.ChatInput,

  command: {
    enabled: true,
    minArsCount: 1,
    slashCommand: {
      enabled: true,
      ephemeral: false,
      dmPermission: true,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          required: true,
          name: "search",
          description: "Name of the video you want to show.",
        },
      ],
    },
  },
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
