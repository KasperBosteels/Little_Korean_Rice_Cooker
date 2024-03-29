const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");

const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "ban",
  description: "Ban a user from your server.",
  defaultMemberPermissions: ["BanMembers"],
  type: ApplicationCommandType.ChatInput,
  dmPermission: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      required: true,
      name: "user",
      description: "The user you want to ban.",
    },
    {
      type: ApplicationCommandOptionType.String,
      required: false,
      name: "reason",
      description: "Reason for banning.",
      maxLength: 255,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      required: false,
      name: "duration",
      description: "for how long you want to ban this user",
    },
  ],
  async execute(client, interaction, con) {
    let userRequest,
      banReason = "no Reason given",
      days = 6;
    if (interaction.options.getUser("user")) {
      userRequest = interaction.options.getUser("user");

      if (interaction.option.getString("reason")) {
        banReason = interaction.option.getString("reason");
      }
      if (!isNaN(parseInt(interaction.options.getString("duration")))) {
        days = parseInt(interaction.options.getString("duration"));
      }

      try {
        userRequest.send({
          embeds: [
            G.GenerateEmbed(
              "Random",
              `you where banned from ${interaction.guild.name}`,
              banReason
            ),
          ],
        });
        userRequest.ban({
          deleteMessageSeconds: 3 * 24 * 60 * 60,
          reason: banReason,
        });
        interaction.reply({
          embeds: [
            G.GenerateEmbed(
              "Random",
              `${userRequest.displayName} was banned.`,
              `reason`
            ),
          ],
        });
      } catch (error) {
        console.log(error);
        interaction.reply({
          embeds: [G.GenerateEmbed("Random", "Something went wrong")],
        });
      }
    }
  },
};
