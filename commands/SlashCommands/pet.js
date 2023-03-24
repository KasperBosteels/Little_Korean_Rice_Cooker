const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const G = require("../../Generators/GenerateSimpleEmbed");
const path = require("../../jsonFiles/bodily_affection.json").pats;
module.exports = {
  name: "pet",
  description: "Sometimes you just need to put your hands on it.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],

  options: [
    {
      type: ApplicationCommandOptionType.User,
      name: "user",
      required: false,
      description: "Pet a user.",
    },
    {
      type: ApplicationCommandOptionType.String,
      required: false,
      name: "text",
      description: "Something you want to pet.",
    },
  ],

  async execute(client, interaction, con) {
    await interaction.deferReply();
    let  responsetext, inbetween;
    inbetween = "*pets*";
    if (interaction.options.getUser("user")) {
      const {user} = interaction.options.getUser("user");
      responsetext = `${interaction.user} **${inbetween}** ${user}`;
    } else if (interaction.options.getString("text")) {
      const {user} = interaction.options.getString("text");
      responsetext = `${interaction.user} **${inbetween}** ${user}`;
    } else {
      userRequest = interaction.user;
      responsetext = `i gently pet ${userRequest}`;
    }
    const gif = path[Math.floor(Math.random() * path.length)];
    const embed = G.GenerateEmbed(
      "Random",
      responsetext,
      false,
      false,
      false,
      gif
    );
    try { 
      await interaction.followUp({
        embeds: [embed],
      });
    }
    catch(err){
      console.log(err)
      await interaction.followUp("Something went wrong.")
    }
  },
};
