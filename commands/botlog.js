const { PermissionsBitField } = require("discord.js");
const logchannels = require("../DataHandlers/getLogChannels.js");
module.exports = {
  name: "bot-log",
  description:
    "Use this command in the channel you want logs to be posted, if you want to stop logs use false after the command.",
  cooldown: 1,
  usage: "(optional): 'disable'",
  guildOnly: "true",
  aliases: ["btl", "botlog"],
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
    const channel = message.channel.id;
    const guildId = message.guild.id;
    if (!channel) return console.log("no channel");
    if (!guildId) return console.log("no guild");

    if (args[0] && args[0].toLowerCase() == "disable") {

      const guild = await con.manager.findOneBy("Guilds",{guild_id:guildId})
      guild.log_channel=null
      try{
        await con.manager.save("Guilds",guild);
        await logchannels.execute(con);

        message.channel.send({
          content: "I will no longer send log messages.",
        });
      }catch(e){
        console.log(e)
        message.channel.send({content:"An error occured try again later."})
      }
    } else {
      //checks if database already exists if true update else insert
      const guild = await con.manager.findOneBy("Guilds",{guild_id:guildId});
      guild.log_channel=channel
      try{
        await con.manager.save("Guilds",guild);
        await logchannels.execute(con);
          return message.channel.send({
            content: "i will send my logs here now",
          });
      }catch(e){
        console.log(e)
        message.channel.send({content:"An error occured try again later."})
      }
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
