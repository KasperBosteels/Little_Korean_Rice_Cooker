const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from your server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to ban.")
        .setRequired(true)
    )
    .addStringOption((option) => {
      option
        .setName("reason")
        .setDescription("The Reason you want to ban.")
        .setRequired(false);
    })
    .addStringOption((option) => {
      option
        .setName("days")
        .setDescription("Amount of days")
        .setRequired(false);
    }),
  async execute(client, interaction, con) {
    let userRequest,
      banReason = "no Reason given",
      days = 6;
    if (interaction.options.getUser("user")) {
      userRequest = interaction.options.getUser("user");

      if (interaction.option.getString("reason")) {
        banReason = interaction.option.getString("reason");
      }
      if (!isNaN(parseInt(interaction.options.getString("days")))) {
        days = parseInt(interaction.options.getString("days"));
      }

      try {
        userRequest.send({
          embeds: [
            G.GenerateEmbed(
              "RANDOM",
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
              "RANDOM",
              `${userRequest.displayName} was banned.`,
              `reason`
            ),
          ],
        });
      } catch (error) {
        console.log(error);
        interaction.reply({
          embeds: [G.GenerateEmbed("RANDOM", "Something went wrong")],
        });
      }
    }
  },
};
