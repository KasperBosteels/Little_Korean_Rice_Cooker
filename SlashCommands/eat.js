const { SlashCommandBuilder } = require("@discordjs/builders");
const eat = require("../jsonFiles/bodily_affection.json").eating;
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("Eat")
    .setDescription("Eat something or someone.")
    .addStringOption((option) =>
      option.setName("eat").setDescription("Eat something.").required(false)
    )
    .addUserOption((option) => {
      option
        .setName("cannibalize")
        .setDescription("Eat someone.")
        .required(false);
    }),

  async execute(client, interaction, con) {
    await interaction.deferReply();
    let userRequest;
    let responsetext;
    if (await interaction.options.getUser("cannibalize")) {
      userRequest = await interaction.options.getUser("cannibalize");
      responsetext = `${interaction.user} **takes a bite out of** ${userRequest}`;
    } else if (await interaction.options.getString("eat")) {
      userRequest = await interaction.options.getString("eat");
      responsetext = `${interaction.user} **takes a bite out of** ${userRequest}`;
    } else {
      userRequest = interaction.user;
      responsetext = `i nibble on ${userRequest}'s toes`;
    }
    const gif = eat[Math.floor(Math.random() * eat.length)];
    let responseEmbed;
    return interaction.editReply({
      content: " ",
      embeds: [
        G.GenerateEmbed(
          "RANDOM",
          responsetext,
          true,
          false,
          false,
          gif,
          false,
          false,
          false
        ),
      ],
      ephemeral: false,
    });
  },
};
