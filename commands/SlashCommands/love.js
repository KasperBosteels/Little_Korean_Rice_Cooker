const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const G = require("../../Generators/GenerateSimpleEmbed");
const love = require("../../jsonFiles/love.json").answer;
module.exports = {
  name: "love",
  description: "For whenever you need some affection of an inanimate object.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],
  options: [
    {
      type: ApplicationCommandOptionType.User,
      required: false,
      name: "user",
      description: "Share some love with someone.",
    },
  ],

  async execute(client, interaction, con) {
    await interaction.deferReply();
    let userRequest, responseEmbed;
    const RandomLove = love[Math.floor(Math.random() * love.length)];
    if (interaction.options.getUser("user")) {
      userRequest = interaction.options.getUser("user");
      responseEmbed = G.GenerateEmbed(
        "Random",
        `${userRequest}\n${RandomLove}`
      );
    } else {
      responseEmbed = G.GenerateEmbed("Random", RandomLove);
    }
    return await interaction.editReply({
      embeds: [responseEmbed],
    });
  },
};
