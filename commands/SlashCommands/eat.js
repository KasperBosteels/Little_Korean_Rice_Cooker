const { SlashCommandBuilder } = require("discord.js");
const eat = require("../../jsonFiles/bodily_affection.json").eating;
const eatingtext = require("../../jsonFiles/bodily_affection.json")[
  "eating-text"
];
const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("eat")
    .setDescription("Eat something or someone.")
    .setDefaultPermission(true)
    .addStringOption((option) =>
      option.setName("text").setDescription("something").setRequired(false)
    )
    .addUserOption((option) =>
      option
        .setName("cannibalize")
        .setDescription("the user you want to eat.")
        .setRequired(false)
    ),
  async execute(client, interaction, con) {
    await interaction.deferReply();
    let userRequest, responsetext, inbetween;
    inbetween = eatingtext[Math.floor(Math.random() * eatingtext.length)];
    if (interaction.options.getUser("cannibalize")) {
      userRequest = interaction.options.getUser("cannibalize");
      responsetext = `${interaction.user} **${inbetween}** ${userRequest}`;
    } else if (interaction.options.getString("text")) {
      userRequest = interaction.options.getString("text");
      responsetext = `${interaction.user} **${inbetween}** ${userRequest}`;
    } else {
      userRequest = interaction.user;
      responsetext = `i nibble on ${userRequest}'s toes`;
    }
    const gif = eat[Math.floor(Math.random() * eat.length)];
    let embed = G.GenerateEmbed(
      "RANDOM",
      responsetext,
      false,
      false,
      false,
      gif
    );
    return await interaction.editReply({
      embeds: [embed],
    });
  },
};
