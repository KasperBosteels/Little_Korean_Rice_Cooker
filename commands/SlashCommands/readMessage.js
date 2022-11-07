const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
const { ApplicationCommandType } = require("discord-api-types/v9");
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
          embed.addField(`${row.topic}`, `${row.message}`, false);
          if (row.Reply != undefined) {
            embed.addField("reply:", `\`\`\`${row.Reply}\`\`\``, true);
          } else {
            embed.addField("reply:", `no reply`, true);
          }
        });
        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    );
  },
};
