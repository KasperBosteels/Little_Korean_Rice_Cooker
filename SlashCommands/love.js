const { SlashCommandBuilder } = require("@discordjs/builders");
const G = require("../Generators/GenerateSimpleEmbed");
const love = require("../jsonFiles/love.json").answer;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("loveyou")
    .setDescription(
      "For whenever you need some affection of an inanimate object."
    )
    .setDefaultPermission(true)
    .addUserOption((option) =>
      option
        .setName("send")
        .setDescription("Share some love.")
        .setRequired(false)
    ),
  async execute(client, interaction, con) {
    await interaction.deferReply();
    let userRequest, responseEmbed;
    const RandomLove = love[Math.floor(Math.random() * love.length)];
    if (interaction.options.getUser("send")) {
      userRequest = interaction.options.getUser("send");
      responseEmbed = G.GenerateEmbed(
        "RANDOM",
        `${userRequest}\n${RandomLove}`
      );
    } else {
      responseEmbed = G.GenerateEmbed("RANDOM", RandomLove);
    }
    return await interaction.editReply({
      embeds: [responseEmbed],
    });
  },
};
