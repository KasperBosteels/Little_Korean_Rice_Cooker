const { SlashCommandBuilder } = require("discord.js");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("read_mail")
    .setDescription("Read Your mail")
    .setDefaultPermission(true),
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
