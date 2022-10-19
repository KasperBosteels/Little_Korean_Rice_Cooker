const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { GenerateEmbed } = require("../../Generators/GenerateSimpleEmbed");
const { logWithNoMember } = require("../../sendToLogChannel");
const logging = require("../../sendToLogChannel");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to warn.")
        .setRequired(true)
    )
    .addStringOption((option) => {
      option
        .setName("reason")
        .setDescription("reason for warning")
        .setRequired(false);
    }),
  async execute(client, interaction, con) {
    let member = await interaction.options.getMember("user");
    let reason = "no reason given";
    if (interaction.option.getString("reason")) {
      reason = await interaction.option.getString("reason");
    }
    con.query(
      `INSERT INTO warnings (guildID,userID,warnings) VALUES("${interaction.guildId}","${member.id}","${reason}")`
    );
    await con.query(
      `SELECT COUNT(*) AS number FROM warnings where userID = '${member.id}' AND guildID = '${interaction.guildId}';`,
      (err, rows, fields) => {
        amount = rows[0].number;
        var embed = GenerateEmbed(
          "#ff0000",
          `**warned:** ${member}\n **warned by:** ${interaction.author} **reason:** ${reason}`,
          false,
          [{ name: "warnings: ", value: `${amount}` }]
        );
      }
    );
    try {
      logWithNoMember(embed, interaction);
    } catch (err) {
      return console.log(err);
    } finally {
      await interaction.reply({ embeds: [embed] });
    }
  },
};
