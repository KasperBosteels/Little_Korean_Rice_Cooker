const { SlashCommandBuilder } = require("@discordjs/builders");
const G = require("../Generators/GenerateSimpleEmbed");
const path = require("../jsonFiles/bodily_affection.json").pats;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pet")
    .setDescription("Sometimes you just need to put your hands on it.")
    .addUserOption((option) => {
      option.setName("user").setDescription("Pet a user.").required(false);
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
