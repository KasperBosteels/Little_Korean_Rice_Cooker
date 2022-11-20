const credit = require("../DataHandlers/socialCredit");
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "whois",
  description: "find out a bit more about this members acount.",
  cooldown: 2,
  usage: "<blank> / <user-id or @user>",
  category: "general",
  perms: ["SendMessages"],
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
  
let socialcreditlevel = "normal";
if (score < 1000)
  socialcreditlevel = "bad <:sadgeCooker:910210761136148581>  ";
if (score >= 1500 && score <= 1999)
  socialcreditlevel = "good <:Cooker:910220565955104818>  ";
if (score >= 2000 && score <= 2999) socialcreditlevel = "very good";
if (score >= 3000 && score <= 3999) socialcreditlevel = "outstanding!";
if (score >= 4000) socialcreditlevel = "**PERFECT**";
const fields = [
{name:"user",value: `\`\`\`${member.user.username}#${member.user.discriminator}\`\`\``,inline:true},
{name:"id",value: `\`\`\`${user.id}\`\`\``,inline:true},
{name:"nickname",value: `\`\`\`${member.nickname}\`\`\``,inline:true},
{name:"bot",value:`${member.user.bot}`,inline:true},
{name:"create date",value:`${member.user.createdAt}`,inline:true},
{name:"join date",value:`${member.joinedAt}`},
{name:"social credit",value:`${score} this score is ${socialcreditlevel}`,inline:true},
]
if (user.system) {
fields.push({name:`**OFFICIAL DISCORD SYSTEM USER**`, value:"TRUE"});
}
if (rolesMap(member, message.guild.id).length > 0) {
fields.push({name:"Roles", value:`${rolesMap(member, message.guild.id)}`, inline:true});
}
  const embed = G.GenerateEmbed(
    "#00ff00",
    false,
    message,
    fields,
    true,
    false,
    false,
    false,
    user.avatarURL({ dynamic: true, format: "png", size: 64 })
  );
 
  return embed;
}
