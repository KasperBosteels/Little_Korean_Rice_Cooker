const save_channels = require("../DataHandlers/profanity_alert_data_collector");
const { PermissionsBitField } = require("discord.js");
module.exports = {
  name: "profanity-alert",
  description:
    'Use this command in the channel you want the message to apear. To stop the alerts type "disable" after the command.',
  cooldown: 3,
  usage: "(optinal): <disable>",
  category: "config",
  aliases: ["profanityalert", "pra"],
  perms: ["SendMessages"],
  userperms: ["Administrator"],
  async execute(client, message, args, con) {
    //check perms
    if (!permission(message))
      return message.reply({ content: "you have no permission to do that." });
    //assigns id to variables and check if received
    var channel = message.channel.id;
    var guild = message.guild.id;
    if (!channel) return console.log("no channel");
    if (!guild) return console.log("no guild");
    if (args[0] && args[0].toLowerCase() == "disable") {
      const Guild = await con.manager.findOneBy("Guilds",{guild_id:guild})
            if(Guild){
              Guild.profanity_channel=null
              con.manager.save(Guild)
            return await message.channel.send({
              content: "I will not send any profanity alert messages here.",
            });
          } else {
            return await message.channel.send({
              content:
                "There wasn't any profanity alert channel set, if there are still messages popping up, send me a message (with the message command).",
            });
          }
    } else {
      //checks if database already exists if true update else insert
      const Guild =await con.manager.findOneBy("Guild",{guild_id:guild})
          if (Guild) {
            Guild.profanity_channel=toString(channel)
            await con.manager.save(Guild);
          } else {
            await con.manager.insert("Guilds",{guild_id:guild,profanity_channel:channel})   
            
           message.channel.send({
            content: "i will send my alerts here now",
          });
        }
      }
      try {
        save_channels.execute(con);
      } catch (err) {
        return console.log(err);
      }
    }
}
function permission(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return false;
  return true;
}
