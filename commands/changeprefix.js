const pr = require("../getprefixData.js");
const { Permissions } = require("discord.js");
module.exports = {
  name: "prefix",
  description:
    "Change the prefix for this server(note: that the prefix cannot have a space).",
  cooldown: 2,
  usage: "<your new prefix>",
  category: "config",
  args: "true",
  guildOnly: "true",
  async execute(client, message, args, con) {
    if (!permissioncheck(message))
      return message.reply({
        content: "You do not have permission to do this, ask a mod.",
      });
    con.query(
      `CALL get_server_prefix("${message.guild.id}",@prefix); SELECT @prefix;`,
      (err, rows) => {
        if (err) return console.error(err);
        if (rows.length) {
          con.query(
            `UPDATE guild SET prefix ="${args[0]}" WHERE guildID = "${message.guild.id}";`
          );
        } else {
          con.query(
            `INSERT INTO guild (guildID,prefix) VALUES ("${message.guild.id}","${args[0]}");`
          );
        }
        pr.execute(con);
      }
    );
    return message.channel.send({
      content: `Updated your prefix to: "${args[0]}".`,
    });
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
