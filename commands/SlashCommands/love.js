const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
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
  ],  async execute(client, interaction, con) {
    const requestedUser = interaction.options.getUser("user");

    const RandomLove = love[Math.floor(Math.random() * love.length)];

    const responseEmbed = G("Random", `${requestedUser?.toString() || ''}\n${RandomLove}`);

    try {
      await interaction.reply({ embeds: [responseEmbed] });
    } catch (err) {
      console.log(err);
      await interaction.reply("Something went wrong.");
    }
  },
};
