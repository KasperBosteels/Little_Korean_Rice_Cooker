const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from your server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("The user you want to unban.")
        .setRequired(true)
    ),
  async execute(client, interaction, con) {
    if (interaction.options.getUser("id")) {
      let userid = interaction.options.getString("id");
      let bans = await interaction.guild.bans.fetch();
      let bannedMember;
      if (bans.has(userid)) bannedMember = bans.get(userid);
      else
        return interaction.reply({
          embeds: [G.GenerateEmbed("#FF0000", "This user is not banned.")],
        });
      try {
        await interaction.guild.members.unban(userid);
        interaction.reply({
          embeds: [
            G.GenerateEmbed(
              "#00FF00",
              `${bannedMember.displayName} was unbanned.`,
              `reason`
            ),
          ],
        });
      } catch (error) {
        console.log(error);
        interaction.reply({
          embeds: [G.GenerateEmbed("#FF0000", "Something went wrong")],
        });
      }
    }
  },
};
