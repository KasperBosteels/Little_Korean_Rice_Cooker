const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const G = require("../../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "unban",
  description: "Unban a user from your server",
  defaultMemberPermissions: ["BanMembers"],
  type: ApplicationCommandType.ChatInput,
  dmPermission: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "id",
      description: "Id of the user you want to unban",
    },
  ],

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
