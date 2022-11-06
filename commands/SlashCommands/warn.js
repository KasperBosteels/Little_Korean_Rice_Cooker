const { ApplicationCommandType } = require("discord.js");
const { ApplicationCommand } = require("discord.js");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Application,
} = require("discord.js");
const { GenerateEmbed } = require("../../Generators/GenerateSimpleEmbed");
const { logWithNoMember } = require("../../sendToLogChannel");
const logging = require("../../sendToLogChannel");
module.exports = {
  name: "warn",
  description:
    "Warn a user.\nWarnings will be saved so you can see them later on.",
  userPermissions: ["ModerateMembers"],
  command: {
    enabled: true,
    minArgsCount: 1,
    slashCommand: {
      enabled: true,
      ephemeral: false,
      dmPermission: false,
      options: [
        {
          type: ApplicationCommandType.User,
          required: true,
          name: "user",
          description: "The User you want to warn",
        },
        {
          type: ApplicationCommandType.String,
          required: false,
          name: "reason",
          description: "The reason for this warning.",
        },
      ],
    },
  },
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
