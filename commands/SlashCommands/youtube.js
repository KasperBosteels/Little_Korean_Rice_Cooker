const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const search = require("yt-search");
module.exports = {
  name: "youtube",
  description: "Quickly look up a Youtube video.",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],
  dmPermission: true,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "search",
      description: "Name of the video you want to show.",
      required: true,
    },
  ],

  async execute(client, interaction, con) {
    try{
    interaction.deferReply();
    const word = interaction.options.getString("search");
    const result = await search.search(word)
    let videos = result.videos.slice(0, 5);
    interaction.followUp(videos[0].url);
    }
    catch(err){
      console.log(err)
      interaction.followUp("Something went wrong.")
    }
  },
};
