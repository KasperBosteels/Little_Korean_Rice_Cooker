const G = require("../Generators/GenerateSimpleEmbed");
const { Permissions } = require("discord.js");
const loggging = require("../sendToLogChannel");
module.exports = {
  name: "unwarn",
  description: "Resets a users warnings(within server).",
  usage: "<@user>",
  guildOnly: "true",
  aliases: ["uw", "unw", "rw"],
  category: "moderating",
  cooldown: 5,
  perms: ["SEND_MESSAGES"],
  userperms: ["MODERATE_MEMBERS"],
  async execute(client, message, args, con) {
    //#region default check
    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply({
        content: "You do not have permission to do this.",
      });
    if (!args[0]) return message.reply("no user tagged");
    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply({ content: "I do not have permission to do this." });
    var unwarnuser = getUserFromMention(args[0], client);
    if (!unwarnuser) return message.reply({ content: "no user found" });
    //#endregion

    //delete warnings from sql server
    con.query(
      `DELETE FROM warnings WHERE userID = "${unwarnuser.id}" AND guildID = "${message.guild.id}"`
    );

    //#region embed
    con.query(
      `SELECT COUNT(*) AS number FROM warnings where userID = '${unwarnuser.id}' AND guildID = '${message.guild.id}';`,
      (err, rows, fields) => {
        amount = rows[0].number;
        //#endregion
        try {
          let embed = G.GenerateEmbed(
            "#ffa500",
            `**warn reset** ${unwarnuser}\n
          **reset by:** ${message.author}`,
            message,
            false,
            true
          );
          loggging.logWithNoMember(embed, message);
          return message.channel.send({ embeds: [embed] });
        } catch (err) {
          return console.log(err);
        }
      }
    );
  },
};
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
