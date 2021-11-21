const messages = require("../welcome_leave_messages");

module.exports = {
  name: "welcome_leave_messages",
  description: "Enable or disable the level system.(UNDER CONSTRUCTION)",
  cooldown: 1,
  usage: " enable or disable",
  category: "config",
  aliases: ["welcome/leave_messages", "w/lmessages", "wlmessages"],
  execute(client, message, args, con) {
    if (!permission(message))
      return message.reply({ content: "You have no permission to do that." });

    let guildID = message.guild.id;
    //check if needed variables are present
    if (!guildID) return message.reply({ content: "Something went badly." });

    //get data from local database
    let enable = messages.CONFIRM(guildID);

    //check if the request was to remove alert
    if (args[0].toLowerCase() == "disable") {
      //stop if no data found
      if (enable == false)
        return message.channel.send({
          content:
            "Welcome and leave messages are already disabled in this server.",
        });
      con.query(
        `DELETE FROM welcome_leave_messages WHERE guildID = '${guildID}';`,
        (err) => {
          if (err) {
            console.error(err);
            return message.channel.send({
              content:
                "An error occurred, try again later.\nPS. is this pproblem keeps occuring notify me with the message command.",
            });
          }
        }
      );
      messages.execute(con);
      return message.channel.send({
        content: "Welcome and leave messages are disabled.",
      });
    } else if (args[0].toLowerCase() == "enable") {
      if (enable == true)
        return message.channel.send({
          content:
            "Welcome and leave message are already enabled in this server.",
        });
      con.query(
        `INSERT INTO welcome_leave_messages (guildID,enabled) VALUES("${guildID}",1)`,
        (err) => {
          if (err) {
            console.log(err);
            return message.channel.send({
              content: "An error occurred, try again later.",
            });
          }
        }
      );
      messages.execute(con);
      return message.channel.send({
        content: "welcome and leave message are enabled.",
      });
    } else {
      return message.channel.send({
        content:
          "Something went wrong, if this problem keeps occuring use the message command to let the dev know.",
      });
    }
  },
};
function permission(message) {
  //check perms
  if (!message.member.Permissions.has("BAN_MEMBERS")) return false;
  if (!message.guild.me.Permissions.has("BAN_MEMBERS")) return false;
  return true;
}
