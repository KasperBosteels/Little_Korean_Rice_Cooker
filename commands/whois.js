const Discord = require("discord.js");
const credit = require("../socalCredit");
module.exports = {
  name: "whois",
  description: "find out a bit more about this members acount.",
  cooldown: 2,
  usage: "<blank> / <user-id or @user>",
  category: "general",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    let user, member, SCS;

    user = await getUserFromMention(args[0], client, message);
    member = await getMember(args[0], message);
    if (!user) user = await getuserfromID(args[0], client);
    if (!args[0]) {
      user = message.author;
      member = message.member;
    }
    //query data base score tabel
    con.query(
      `SELECT socialScore FROM score WHERE userID="${user.id}";`,
      (err, score) => {
        if (err) return console.error(err);
        if (score.length) {
          SCS = score[0].socialScore;
        } else {
          SCS = 1000;
          credit.ADDUSER(con, user.id);
        }

        //return with embed message
        return message.channel.send({
          embeds: [makeEmbed(user, member, message, SCS)],
        });
      }
    );
  },
};
function getUserFromMention(mention, client, message) {
  if (!mention) return;
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
    return client.users.cache.get(mention);
  } else if (!isNaN(parseInt(mention))) {
    return message.guild.members.fetch(
      message.guild.members.cache.get(mention)
    );
  }
}
function getMember(mention, message) {
  let member = undefined;
  if (!isNaN(parseInt(mention))) {
    member = message.guild.members.fetch(
      message.guild.members.cache.get(mention)
    );
  } else {
    member = message.mentions.members.first();
  }
  return member;
}
async function getuserfromID(arg, client) {
  if (!regexCheck(arg)) {
    let user = await client.users.fetch(arg);
    return user;
  }
}
function regexCheck(text) {
  let rex = /[a-zA-Z]/g;
  if (rex.test(text)) {
    return true;
  } else {
    return false;
  }
}
function rolesMap(member, guildID) {
  let roles = member.roles.cache
    .filter((roles) => roles.id !== guildID)
    .map((role) => role.toString());
  return roles;
}
function makeEmbed(user, member, message, score) {
  const embed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .setFooter({
      text: message.member.displayName,
      iconURL: message.author.displaAvatarUrl,
    })
    .setTimestamp();
  embed.addField(
    "user",
    `\`\`\`${member.user.username}#${member.user.discriminator}\`\`\``,
    (inline = true)
  );
  embed.addField("id", `\`\`\`${user.id}\`\`\``, (inline = true));
  if (member.nickname != null && member.nickname != undefined) {
    embed.addField(
      "nickname",
      `\`\`\`${member.nickname}\`\`\``,
      (inline = true)
    );
  }
  embed.addField("bot", `${member.user.bot}`, (inline = true));
  embed.addField("creation date", `${member.user.createdAt}`, (inline = true));
  embed.addField("join date", `${member.joinedAt}`);
  embed.setThumbnail(
    user.avatarURL({ dynamic: true, format: "png", size: 64 })
  );
  let socialcreditlevel = "normal";
  if (score < 1000)
    socialcreditlevel = "bad <:sadgeCooker:910210761136148581>  ";
  if (score >= 1500 && score <= 1999)
    socialcreditlevel = "good <:Cooker:910220565955104818>  ";
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
  if (rolesMap(member, message.guild.id).length > 0) {
    embed.addField("Roles", `${rolesMap(member, message.guild.id)}`, true);
  }
  return embed;
}
