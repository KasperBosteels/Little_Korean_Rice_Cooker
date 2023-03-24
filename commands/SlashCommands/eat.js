const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const eat = require("../../jsonFiles/bodily_affection.json").eating;
const eatingText = require("../../jsonFiles/bodily_affection.json")[
  "eating-text"
];
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  name: "eat",
  description: "Eat something or someone.",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],
  dmPermission: true,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: false,
      name: "eat",
      description: "Thing you want to put in your mouth.",
    },
    {
      type: ApplicationCommandOptionType.User,
      required: false,
      name: "cannibalize",
      description: "the user you want to nibble on.",
    },
  ],

  async execute(client, interaction, con) {
    await interaction.deferReply();
    const eatingTextRandom = eatingText[Math.floor(Math.random() * eatingText.length)];
    let user = interaction.options.getUser("cannibalize");
    let thing = interaction.options.getString("eat");
  
    if (!user && !thing) {
      user = interaction.user;
      thing = `${user}'s toes`;
    } else if (user) {
      thing = user.toString();
    }
  
    const gif = eat[Math.floor(Math.random() * eat.length)];
    const embed = G("Random", `${interaction.user} **${eatingTextRandom}** ${thing}`, false, false, false, gif);
    return await interaction.editReply({
      embeds: [embed],
    });
  }
};