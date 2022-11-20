const { PermissionsBitField } = require("discord.js");
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "warnings",
  description: "see the warnings against a user",
  usage: "<@user>",
  guildOnly: "true",
  aliases: ["warning", "warns"],
  category: "moderating",
  cooldown: 5,
  perms: ["SEND_MESSAGES"],
  userperms: ["MODERATE_MEMBERS"],
  async execute(client, message, args, con) {
    //#region default check
    if (!permissioncheck(message))
      return message.reply(
        "Either you or i do not have the permission to look at this(kick members permission)."
      );
    if (!args[0]) return message.reply({ content: "no user tagged" });
    var warnuser = getUserFromMention(args[0], client);
    if (!warnuser) return message.reply({ content: "No user found." });
    //#endregion
    //get the amounts a user was warned
    await con.query(
      `SELECT warnings FROM warnings WHERE userID = ${warnuser.id} AND guildID = ${message.guild.id};`,
      (err, rows, fields) => {
        let warningsString = "```";
        if (rows.length == 0) warningsString += "No warnings.";
        for (let i = 0; i < rows.length; i++) {
          warningsString += `[${i + 1}] ${rows[i].warnings}\n`;
        }
        warningsString += "```";
        var embed = G.GenerateEmbed(
          "#ff0000",
          `**warnings for:** ${warnuser}\n
        ${warningsString}`,
          message,
          false,
          true
        );
        return message.channel.send({ embeds: [embed] });
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
