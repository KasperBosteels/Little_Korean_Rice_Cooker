const Discord = require("discord.io");
const { Permissions } = require("discord.js");
const sqlcon = require("../sql_serverconnection.js");
module.exports = {
  name: "ban",
  description: "Ban user.",
  usage: "<@user> (optional:<reason>)",
  guildOnly: "true",
  category: "moderating",
  cooldown: 1,
  async execute(client, message, args, con) {
    //check permissions of user
    if (!permissioncheck(message))
      return message.reply({
        content: "You or i don't have permission to do that.",
      });
    //check if a person was mentioned
    const user = getUserFromMention(args[0], client);
    if (!user) {
      return message.reply({
        content: "Please use a proper mention if you want to ban someone.",
      });
    }
    //look if reason was given for ban from the server
    args.shift();
    var Reason = args.join(" ");
    if (!Reason) Reason = `no reason given by ${message.author.name}`;
    try {
      //try to ban member with reason
      await message.guild.members.ban(user, { days: 7, reason: Reason });
      let embedforlog = makeEmbed(user, message, reason);
    } catch (error) {
      //if unsucsessfull display failed message
      return message.channel.send({
        content: `Failed to ban **${user.tag}**: ${error}`,
      });
    } finally {
      message.channel.send({
        content: `:man_police_officer: ${user.tag} has been successfully banned :man_police_officer: `,
      });
      //send message to logchannel
      sqlcon.execute(con, user, 5, embedforlog);
    }
  },
};
function permissioncheck(message) {
  //check perms
  if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
    return false;
  if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
    return false;
  return true;
}

function makeEmbed(user, message, reason) {
  const embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setFooter(user.tag, message.author.displayAvatarURL)
    .setTimestamp().setDescription(`**BANNED:** ${user.tag}\n
                    Banned by: ${message.author}\n
                    **Reason:** ${reason}`);
  return embed;
}
//advanced identifier for user to not ban the wrong person
function getUserFromMention(mention, client) {
  if (!mention) return;
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
    return client.users.cache.get(mention);
  }
}
