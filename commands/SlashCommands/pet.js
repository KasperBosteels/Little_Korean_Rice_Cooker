const { SlashCommandBuilder } = require("@discordjs/builders");
const G = require("../../Generators/GenerateSimpleEmbed");
const path = require("../../jsonFiles/bodily_affection.json").pats;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pet")
    .setDescription("Sometimes you just need to put your hands on it.")
    .setDefaultPermission(true)
    .addUserOption((option) =>
      option.setName("user").setDescription("Pet a user.").setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("something you want to pet")
        .setRequired(false)
    ),
  async execute(client, interaction, con) {
    await interaction.deferReply();
    let userRequest, responsetext, inbetween;
    inbetween = "*pets*";
    if (interaction.options.getUser("user")) {
      userRequest = interaction.options.getUser("user");
      responsetext = `${interaction.user} **${inbetween}** ${userRequest}`;
    } else if (interaction.options.getString("text")) {
      userRequest = interaction.options.getString("text");
      responsetext = `${interaction.user} **${inbetween}** ${userRequest}`;
    } else {
      userRequest = interaction.user;
      responsetext = `i gently pet ${userRequest}`;
    }
    const gif = path[Math.floor(Math.random() * path.length)];
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
