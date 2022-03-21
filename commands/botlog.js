const { Permissions } = require("discord.js");
const logchannels = require("../getLogChannels.js");
module.exports = {
  name: "bot-log",
  description:
    "Use this command in the channel you want logs to be posted, if you want to stop logs use false after the command.",
  cooldown: 1,
  usage: "(optional): <false>",
  guildOnly: "true",
  aliases: ["btl", "botlog"],
  category: "config",
  perms: ["SEND_MESSAGES"],
  userperms: ["ADMINISTRATOR"],
  execute(client, message, args, con) {
    //check perms
    if (!permission(message))
      return message.reply({
        content: "Only an administrator is able to execute this command.",
      });
    //assigns id to variables and check if received
    var channel = message.channel.id;
    var guild = message.guild.id;
    if (!channel) return console.log("no channel");
    if (!guild) return console.log("no guild");

    if (args[0] && args[0].toLowerCase() == "false") {
      con.query(
        `SELECT EXISTS(SELECT log_channel FROM guild WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send("ERROR N.2.1*");
          }
          if (rows[0].exist != 0) {
            con.query(
              `UPDATE guild SET log_channel = NULL WHERE guildID = "${guild}";`
            );
            message.channel.send({
              content: "I will not send any log messages here.",
            });
          } else {
            return message.channel.send({
              content:
                "There wasn't any log channel set, if there are still messages popping up try renaming it or sending me a message (with the message command).",
            });
          }
        }
      );
    } else {
      //checks if database already exists if true update else insert
      con.query(
        `SELECT EXISTS(SELECT log_channel FROM guild WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send({ content: "Something broke, sorry." });
          }
          if (rows[0].exist != 0) {
            con.query(
              `UPDATE guild SET log_channel = '${channel}' WHERE guildID = '${guild}';`
            );
          } else {
            con.query(
              `INSERT INTO guild (guildID,log_channel) VALUES("${guild}","${channel}");`,
              (err) => {
                if (err) {
                  console.log(err);
                  message.channel.send({
                    content: "Something broke, very sorry.",
                  });
                }
              }
            );
          }
          logchannels.execute(con);
          return message.channel.send({
            content: "i will send my logs here now",
          });
        }
      );
    }
  },
};
function permission(message) {
  //check perms
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTATOR)) {
    return false;
  }
  return true;
}
