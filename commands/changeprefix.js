const updatePrefix = require("../DataHandlers/getprefixData.js");
const { PermissionsBitField } = require("discord.js");
module.exports = {
  name: "prefix",
  description:
    "Change the prefix for this server(note: that the prefix cannot have a space).",
  cooldown: 2,
  usage: "<your new prefix>",
  category: "config",
  args: "true",
  guildOnly: "true",
  persm: ["SendMessages"],
  userperms: ["Administrator"],
  async execute(client, message, args, con) {
    if (!permissioncheck(message))
      return message.reply({
        content: "You need to be an administrator to do this.",
      });
      const guildId = message.guild.id;
      if(!guildId)return message.channel.send({content:"An error occured, try again later."})
      const guild = await con.manager.findOneBy("Guilds",{guild_id:guildId})
      guild.guild_prefix = args[0]?args[0]:"-";
      try{
        await con.manager.save("Guilds",guild)
        await updatePrefix.execute(client,con)
        return message.channel.send({
        content: `Updated your prefix to: "${args[0]?args[0]:"-"}".`,
      });
      }catch(e){
        console.log(e)
      }
  },
  async update(guildID, prefix, con) {
    const guild = await con.manager.findOneBy("Guilds",{guild_id:guildID})
    guild.guild_prefix=prefix;
    try{
      await con.manager.save("Guilds",guild);
      await updatePrefix.execute(client,con)
      return true
    }catch(e){
      console.log(e)
      return false;
    }
  },
};
function permissioncheck(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return false;
  return true;
}
