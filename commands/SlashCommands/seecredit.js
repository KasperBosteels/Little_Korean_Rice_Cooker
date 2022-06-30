const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const credit = require("../../socalCredit");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("credit")
    .setDefaultPermission(true)
    .setDescription("Look at your own or someone elses credit.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Social credit from a user(optional).")
        .setRequired(false)
    ),
  async execute(client, interaction, con) {
    await interaction.deferReply({ ephemeral: true });
    let user = await interaction.options.getUser("user");
    if (user == undefined) {
      user = interaction.user;
    }
    con.query(
      `SELECT socialScore FROM score WHERE userID="${user.id}"; `,
      (err, score) => {
        if (err) return console.error(err);
        if (score.length) {
          SCS = score[0].socialScore;
        } else {
          SCS = 1000;
          credit.ADDUSER(con, user.id);
        }

        //return with embed message
        return interaction.editReply({
          content: " ",
          embeds: [makeEmbed(client, user, SCS)],
          ephemeral: true,
        });
      }
    );
  },
};

function makeEmbed(client, user, score) {
  const embed = new Discord.MessageEmbed().setColor("#00ff00").setTimestamp();
  embed.addField(
    "user",
    `\`\`\`${user.username}#${user.discriminator}\`\`\``,
    (inline = true)
  );
  embed.addField("id", `\`\`\`${user.id}\`\`\``, (inline = true));
  embed.setThumbnail(
    user.avatarURL({ dynamic: true, format: "png", size: 64 })
  );
  let sademoji = ":pensive:";
  let happyemoji = ":smile:";
  let socialcreditlevel = "normal";
  if (score < 1000) socialcreditlevel = `bad ${sademoji}`;
  if (score >= 1500 && score <= 1999) socialcreditlevel = `good ${happyemoji}`;
  if (score >= 2000 && score <= 2999) socialcreditlevel = "very good";
  if (score >= 3000 && score <= 3999) socialcreditlevel = "outstanding!";
  if (score >= 4000) socialcreditlevel = "**PERFECT**";
  embed.addField(
    "social Credit",
    `${score} this score is ${socialcreditlevel}`,
    (inline = true)
  );
  if (user.system) {
    embed.addField(`**OFFICIAL DISCORD SYSTEM USER**`, "TRUE");
  }
  return embed;
}
