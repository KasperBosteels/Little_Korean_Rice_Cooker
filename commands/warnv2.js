const { PermissionsBitField } = require("discord.js");
const logging = require("../sendToLogChannel");
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "warn",
  description: "Warn a user.",
  usage: "<@user>",
  guildOnly: "true",
  aliases: ["w"],
  category: "moderating",
  cooldown: 10,
  perms: ["ModerateMembers"],
  async execute(client, message, args, con) {
    //#region default check
    if (!permissioncheck(message))
      return message.reply(
        "Either you or i do not have the permission to look at this(kick members permission)."
      );
    if (!args[0]) return message.reply({ content: "no user tagged" });
    var warnuser = getUserFromMention(args[0], client);
    var reason = args.slice(1).join(" ");
    if (!warnuser) return message.reply({ content: "No user found." });
    //#endregion
    //get data and insert into data base
    con.query(
      `INSERT INTO warnings (guildID,userID,warnings) VALUES("${message.guild.id}","${warnuser.id}","${reason}")`
    );
    //get the amounts a user was warned
    await con.query(
      `SELECT COUNT(*) AS number FROM warnings where userID = '${warnuser.id}' AND guildID = '${message.guild.id}';`,
      (err, rows, fields) => {
        amount = rows[0].number;
        //#region embed
        var embed = G.GenerateEmbed(
          "#ff0000",
          `**warned** ${warnuser}\n
**warned by:** ${message.author}
**reason:** ${reason}`,
          message,
          [(fields = { name: "warnings: ", content: `${amount}` })],
          true
        );
        //#endregion

        //send embed message to logchannel and channel where the command was given
        try {
          logging.logWithNoMember(embed, message);
        } catch (err) {
          return console.log(err);
        } finally {
          message.channel.send({ embeds: [embed] });
        }
      }
    );
  },
  async aleternateWarn(con, guildID, userID, input, memberName) {
    //insert warning.
    await con.query(
      `INSERT INTO warnings (guildID,userID,warnings) VALUES("${guildID}","${userID}","${input}")`
    );

    //create warning embed
    await con.query(
      `SELECT COUNT(*) AS number FROM warnings where userID = '${userID}' AND guildID = '${guildID}';`,
      (err, rows, fields) => {
        amount = rows[0].number;
        //#region embed
        var embed = G.GenerateEmbed(
          "#ff0000",
          `\`\`\`automatic warning\`\`\`\n\`\`\`${memberName} has been automatically warned for profanity\`\`\``,
          (footer = {
            text: "Due to poor social credit(less than 500) this user was warned.",
            url: "",
          }),
          (fields = [{ name: "warnings: ", content: `${amount}` }]),
          true
        );
        //#endregion

        //send embed message to logchannel and channel where the command was given
        try {
          logging.logWithNoMember(embed, message);
        } catch (err) {
          return console.log(err);
        } finally {
          message.channel.send({ embeds: [embed] });
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
function permissioncheck(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
    return false;

  return true;
}
