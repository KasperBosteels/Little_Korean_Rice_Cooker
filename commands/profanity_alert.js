const save_channels = require("../DataHandlers/profanity_alert_data_collector");
const { Permissions } = require("discord.js");
module.exports = {
  name: "profanity-alert",
  description:
    'Use this command in the channel you want the message to apear. To stop the alerts type "disable" after the command.',
  cooldown: 3,
  usage: "(optinal): <disable>",
  category: "config",
  aliases: ["profanityalert", "pra"],
  perms: ["SEND_MESSAGES"],
  userperms: ["ADMINISTRATOR"],
  execute(client, message, args, con) {
    //check perms
    if (!permission(message))
      return message.reply({ content: "you have no permission to do that." });
    //assigns id to variables and check if received
    var channel = message.channel.id;
    var guild = message.guild.id;
    if (!channel) return console.log("no channel");
    if (!guild) return console.log("no guild");
    if (args[0] && args[0].toLowerCase() == "disable") {
      con.query(
        `SELECT EXISTS(SELECT profanity_channel FROM guild WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send({ content: "NO 2.1*" });
          }
          if (rows[0].exist != null) {
            con.query(
              `UPDATE guild set profanity_channel = NULL WHERE guildID = "${guild}";`
            );
            message.channel.send({
              content: "I will not send any profanity alert messages here.",
            });
          } else {
            return message.channel.send({
              content:
                "There wasn't any profanity alert channel set, if there are still messages popping up, send me a message (with the message command).",
            });
          }
        }
      );
    } else {
      //checks if database already exists if true update else insert
      con.query(
        `SELECT EXISTS(SELECT profanity_channel FROM guild WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send({
              content: "Something broke, i'm sorry. error: 5",
            });
          }
          if (rows[0].exist != null) {
            con.query(
              `UPDATE guild SET profanity_channel = '${channel}' WHERE guildID = '${guild}';`
            );
          } else {
            con.query(
              `INSERT INTO guild (guildID,profanity_channel) VALUES("${guild}","${channel}");`,
              (err) => {
                if (err) {
                  console.log(err);
                  message.channel.send({
                    content: "Something broke, very sorry. error: 6",
                  });
                }
              }
            );
          }
          return message.channel.send({
            content: "i will send my alerts here now",
          });
        }
      );
      try {
        save_channels.execute(con);
      } catch (err) {
        return console.log(err);
      }
    }
  },
};
function permission(message) {
  //check perms
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    return false;
  return true;
}
