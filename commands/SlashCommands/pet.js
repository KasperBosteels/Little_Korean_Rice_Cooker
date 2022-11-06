const { ApplicationCommandType, Application } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const G = require("../../Generators/GenerateSimpleEmbed");
const path = require("../../jsonFiles/bodily_affection.json").pats;
module.exports = {
  name: "pet",
  description: "Sometimes you just need to put your hands on it.",
  command: {
    enabled: true,
    slashCommand: {
      enabled: true,
      ephemeral: false,
      dmPermission: true,
      options: [
        {
          type: ApplicationCommandType.User,
          name: "user",
          required: false,
          description: "Pet a user.",
        },
        {
          type: ApplicationCommandType.String,
          required: false,
          name: "text",
          description: "Something you want to pet.",
        },
      ],
    },
  },
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
