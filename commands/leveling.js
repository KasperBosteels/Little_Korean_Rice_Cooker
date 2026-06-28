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
    if(!args[0])return message.reply({content:"you need to give me arguments to work with\n example: "+this.name+this.usage,ephemeral:true})
    //check if the request was to remove alert
    if (args[0].toLowerCase() == "disable") {
      //stop if no data found
      if (enable == 0)
        return message.channel.send({
          content: "Leveling is already disabled in this server.",
        });
        const g = await con.manager.findOneBy("Guild",{guild_id:guildID});
        if (g) {
          g.level_system=0
          await con.manager.save("Guild", g)
        }
      await leveling.execute(con);
      return message.channel.send({ content: "Leveling system is disabled." });
    } else if (args[0].toLowerCase() == "enable") {
      if (enable == 1)
        return message.channel.send({
          content: "Leveling is already enabled in this server.",
        });
      const g = await con.manager.findOneBy("Guild",{guild_id:message.guild.id});
      if (g) {
        g.level_system=1
        await con.manager.save("Guild", g)
      }
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

    const Guild = await con.manager.findOneBy("Guild",{guild_id:guildID})
    if(Guild){
      Guild.level_system=value
      await con.manager.save("Guild", Guild)
          } else {
        await con.manager.insert("Guild",{guild_id:guildID,level_system:value})
          return true;
          }
    await leveling.execute(con);
  },
};
function permission(message) {
  let mem = message.member;
  //check perms
  if (!mem.permissions.has(PermissionsBitField.Flags.Administrator)) return false;
  return true;
}
