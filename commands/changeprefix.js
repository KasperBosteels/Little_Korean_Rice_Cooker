const pr = require("../DataHandlers/getprefixData.js");
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
  persm: ["SEND_MESSAGES"],
  userperms: ["ADMINISTRATOR"],
  async execute(client, message, args, con) {
    if (!permissioncheck(message))
      return message.reply({
        content: "You need to be an administrator to do this.",
      });
    con.query(
      `SELECT prefix from guild where guildID = ${message.guild.id}`,
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
  async update(guildID, prefix, con) {
    try {
      con.query(
        `SELECT prefix from guild where guildID = ${guildID}`,
        (err, rows) => {
          if (err) return console.error(err);
          if (rows.length) {
            con.query(
              `UPDATE guild SET prefix ="${prefix}" WHERE guildID = "${guildID}";`
            );
          } else {
            con.query(
              `INSERT INTO guild (guildID,prefix) VALUES ("${guildID}","${prefix}");`
            );
          }
          pr.execute(con);
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
function permissioncheck(message) {
  //check perms
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTATOR))
    return false;
  return true;
}
