const { PermissionsBitField } = require("discord.js");
const welcome_data = require("../DataHandlers/welcome_message_data_collector");
module.exports = {
  name: "custom_welcome",
  description:
    "set a custom welcome message.\n``` to use a username => {user}\n to say the servername => {server}```\nTo disable custom welcome type 'disable' after the command.",
  cooldown: 1,
  usage: "<your message>",
  guildOnly: "true",
  aliases: ["welcomemessage", "customwelcome", "welcome"],
  category: "config",
  perms: ["SendMessages"],
  userperms: ["Administrator"],
  execute(client, message, args, con) {
    //check perms
    if (!permission(message))
      return message.reply({
        content: "Only an administrator is able to use this command.",
      });
    //assigns id to variables and check if received
    var guild = message.guild.id;
    if (!guild)
      return console.log(
        "I was unnable to determine this guilds id, try again later."
      );

    if (args[0] && args[0].toLowerCase() == "disable") {
      con.query(
        `SELECT EXISTS(SELECT welcome_message FROM custom_welcome_message WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send("ERROR something broke.");
          }
          if (rows[0].exist != 0) {
            con.query(
              `UPDATE custom_welcome_message SET welcome_message = NULL WHERE guildID = "${guild}";`
            );
            message.channel.send({
              content: "I removed your servers welcome message.",
            });
          } else {
            return message.channel.send({
              content: "There was no custom welcome message send.",
            });
          }
        }
      );
    } else {
      //checks if database already exists if true update else insert
      con.query(
        `SELECT EXISTS(SELECT welcome_message FROM custom_welcome_message WHERE guildID = "${guild}")AS exist;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            message.channel.send({ content: "Something broke, sorry." });
          }
          if (rows[0].exist != 0) {
            con.query(
              `UPDATE custom_welcome_message SET welcome_message = '${args.join(
                " "
              )}' WHERE guildID = '${guild}';`
            );
          } else {
            con.query(
              `INSERT INTO custom_welcome_message (guildID,welcome_message) VALUES("${guild}","${args.join(
                " "
              )}");`,
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
            content: "Your custom welcome message was saved.",
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
