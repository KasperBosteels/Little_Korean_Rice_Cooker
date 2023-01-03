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
  async execute(client, message, args, con) {
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
      const G = await con.manager.findoneBy("Guilds",{guild_id:guild})
      if(!G.welcome_channel){
        G.welcome_channel = null
        await con.manager.save(G)
        return await message.channel.send({
          content: "I will not send any welcome messages here.",
        });
      } else {
            return message.channel.send({
              content: "There wasn't any welcome channel set.",
            });
          }
      } else {
      //checks if database already exists if true update else insert
      const M = await con.manager.findOneBy("Guilds",{guild_id:guild})
        M.welcome_channel= toString(channel)
        await con.manager.save(M)
        await welcome_data.execute(con);
        return message.channel.send({
          content: "i will send welcomes here now",
        });
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
