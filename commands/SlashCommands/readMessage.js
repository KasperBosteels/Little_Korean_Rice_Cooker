const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
const { ApplicationCommandType, MessageFlags } = require("discord.js");
module.exports = {
  name: "read_mail",
  description: "Read all messages you send or received from the developers.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],

  async execute(client, interaction, con) {
    await con.query(
      `SELECT * FROM user_messages WHERE userID = ${interaction.member.id}`,
      (err, rows) => {
        if (err) return console.error(err);
        let embed = G("#000ff", "all your messages", false, false, true);
        rows.forEach((row) => {
          embed.addFields({ name: `${row.topic}`, value: `${row.message}`, inline: false });
          if (row.Reply != undefined) {
            embed.addFields({ name: "reply:", value: `\`\`\`${row.Reply}\`\`\``, inline: true });
          } else {
            embed.addFields({ name: "reply:", value: `no reply`, inline: true });
          }
        });
        interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
      }
    );
  },
};
