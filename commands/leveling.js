const leveling = require("../DataHandlers/leveling_enabled");
const { PermissionsBitField } = require("discord.js");
module.exports = {
  name: "level-system",
  description: "Enable or disable the level system.",
  cooldown: 1,
  usage: " <enable> / <disable>",
  category: "config",
  aliases: ["leveling", "level_system"],
  perms: ["SEND_MESSAGES"],
  userperms: ["Administrator"],
  async execute(client, message, args, con) {
    if (!permission(message))
      return message.reply({
        content: "You need to be an administator to do this.",
      });

    let guildID = message.guild.id;
    //check if needed variables are present
    if (!guildID) return message.reply({ content: "Something went badly." });

    //get data from local database
    let enable = await leveling.GET(guildID);

    //check if the request was to remove alert
    if (args[0].toLowerCase() == "disable") {
      //stop if no data found
      if (enable == 0)
        return message.channel.send({
          content: "Leveling is already disabled in this server.",
        });
      con.query(
        `UPDATE guild set level_system = 0 WHERE guildID = '${guildID}';`,
        (err) => {
          if (err) {
            console.error(err);
            return message.channel.send({
              content:
                "An error occurred, try again later.\nPS. is this problem keeps occuring notify me with the message command.",
            });
          }
        }
      );
      await leveling.execute(con);
      return message.channel.send({ content: "Leveling system is disabled." });
    } else if (args[0].toLowerCase() == "enable") {
      if (enable == 1)
        return message.channel.send({
          content: "Leveling is already enabled in this server.",
        });
      con.query(
        `UPDATE guild SET level_system = 1 WHERE guildID="${message.guild.id}"`,
        (err) => {
          if (err) {
            console.log(err);
            return message.channel.send({
              content: "An error occurred, try again later.",
            });
          }
        }
      );
      await leveling.execute(con);
      return message.channel.send({ content: "Leveling is enabled." });
    } else {
      return message.channel.send({
        content:
          "Something went wrong, if this problem keeps occuring use the message command to let the dev know.",
      });
    }
  },
  async update(guildID, value) {
    con.query(
      `SELECT level_system from guild where guildID = ${guildID}`,
      (err, rows) => {
        if (err) return console.error(err);
        try {
          if (rows.length) {
            con.query(
              `UPDATE guild set level_system = ${value} WHERE guildID = '${guildID}';`
            );
          } else {
            con.query(
              `INSERT INTO guild (guild,level_system) VALUES ("${guildID},${value}")`
            );
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    );
    await leveling.execute(con);
  },
};
function permission(message) {
  let mem = message.member;
  //check perms
  if (!mem.permissions.has(PermissionsBitField.Flags.Administrator)) return false;
  return true;
}
