const { PermissionsBitField } = require("discord.js");
const welcome_data = require("../DataHandlers/welcome_data");
module.exports = {
  name: "welcome_channel",
  description:
    "Use this command in the channel you want welcome messages to appear, if you want to stop use disable after the command.",
  cooldown: 1,
  usage: "<disable>(optional)",
  guildOnly: "true",
  aliases: [
    "welcomelog",
    "welcomechannel",
    "welcome_log",
    "welcome-channel",
    "welcome-log",
  ],
  category: "config",
  perms: ["SendMessages"],
  userperms: ["Administrator"],
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

    if (args[0] && args[0].toLowerCase() == "disable") {
      con.query(
        `SELECT EXISTS(SELECT welcome_channel FROM guild WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send("ERROR something broke.");
          }
          if (rows[0].exist != 0) {
            con.query(
              `UPDATE guild SET welcome_channel = NULL WHERE guildID = "${guild}";`
            );
            message.channel.send({
              content: "I will not send any welcome messages here.",
            });
          } else {
            return message.channel.send({
              content: "There wasn't any welcome channel set.",
            });
          }
        }
      );
    } else {
      //checks if database already exists if true update else insert
      con.query(
        `SELECT EXISTS(SELECT welcome_channel FROM guild WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send({ content: "Something broke, sorry." });
          }
          if (rows[0].exist != 0) {
            con.query(
              `UPDATE guild SET welcome_channel = '${channel}' WHERE guildID = '${guild}';`
            );
          } else {
            con.query(
              `INSERT INTO guild (guildID,welcome_channel) VALUES("${guild}","${channel}");`,
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
          welcome_data.execute(con);
          return message.channel.send({
            content: "i will send welcomes here now",
          });
        }
      );
    }
  },
};
function permission(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return false;
  }
  return true;
}
