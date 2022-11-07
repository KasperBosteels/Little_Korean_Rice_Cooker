const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");

const eat = require("../../jsonFiles/bodily_affection.json").eating;
const eatingtext = require("../../jsonFiles/bodily_affection.json")[
  "eating-text"
];
const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "eat",
  descritpion: "Eat something or someone.",
  type: ApplicationCommandType.ChatInput,

  command: {
    enabled: true,
    minArgsCount: 0,
    slashCommand: {
      enabled: true,
      ephemeral: false,
      dmPermission: true,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          required: false,
          name: "eat",
          description: "Thing you want to put in your mouth.",
          maxLength: 255,
        },
        {
          type: ApplicationCommandOptionType.User,
          required: false,
          name: "cannibalize",
          description: "the user you want to nibble on.",
        },
      ],
    },
  },
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
