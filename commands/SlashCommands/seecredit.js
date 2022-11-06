const { Discord } = require("discord.js");
const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const credit = require("../../socalCredit");
module.exports = {
  name: "credit",
  description: "Look at your own or someone elses social credit.",
  type: ApplicationCommandType.ChatInput,

  command: {
    enabled: false,
    slashCommand: {
      enabled: true,
      ephemeral: false,
      dmPermission: false,
      options: {
        type: ApplicationCommandOptionType.User,
        required: false,
        name: "user",
        description: "Social credit of a user",
      },
    },
  },
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
  let socialcreditlevel = "normal";
  if (score < 500)
    socialcreditlevel = `too low to use commands <:cookerangry:927889358231597127> `;
  if (score < 1000) socialcreditlevel = `bad <:cookersad:927889427500499006> `;
  if (score >= 1500 && score <= 1999)
    socialcreditlevel = `good <:cooker:927889501295095879> `;
  if (score >= 2000 && score <= 2999) socialcreditlevel = "very good";
  if (score >= 3000 && score <= 3999) socialcreditlevel = "outstanding!";
  if (score >= 4000) socialcreditlevel = "**AMAZING**";
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
