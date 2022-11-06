const { ApplicationCommandType } = require("discord.js");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Application,
} = require("discord.js");
const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "unban",
  description: "Unban a user from your server",
  userPermissions: ["BanMembers"],
  command: {
    enabled: true,
    minArsCount: 1,
    slashCommand: {
      enabled: true,
      ephemeral: true,
      dmPermission: false,
      options: [
        {
          type: ApplicationCommandType.String,
          required: true,
          name: "id",
          description: "Id of the user you want to unban",
        },
      ],
    },
  },
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
