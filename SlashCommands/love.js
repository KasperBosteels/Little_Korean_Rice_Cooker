const { SlashCommandBuilder } = require("@discordjs/builders");
const G = require("../Generators/GenerateSimpleEmbed");
const love = require("../jsonFiles/love.json").answer;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("love")
    .setDescription(
      "For whenever you need some affection of an inanimate object."
    )
    .addUserOption((option) => {
      option
        .setName("send love")
        .setDescription("Share some love.")
        .required(false);
    }),
  async execute(client, interaction, con) {
    await interaction.deferReply();
    let userRequest;
    let responseEmbed;
    const RandomLove = love[Math.floor(Math.random() * love.length)];
    if (await interaction.options.getUser("cannibalize")) {
      userRequest = await interaction.options.getUser("send love");
      responseEmbed = G.GenerateEmbed(
        "RANDOM",
        userRequest + "\n" + RandomLove,
        true,
        false,
        fale,
        false,
        false,
        false,
        false
      );
    } else {
      responseEmbed = G.GenerateEmbed(
        "RANDOM",
        RandomLove,
        true,
        false,
        fale,
        false,
        false,
        false,
        false
      );
    }
    return interaction.editReply({
      content: " ",
      embeds: [responseEmbed],
    });
  },
};
