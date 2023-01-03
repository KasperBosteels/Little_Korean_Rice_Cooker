const profanity = require("../DataHandlers/profanity_enabled");
const { PermissionsBitField } = require("discord.js");
module.exports = {
  name: "profanity-filter",
  description: "enable or disable the profanity filter",
  cooldown: 3,
  usage: "<enable> / <disable>",
  category: "config",
  aliases: ["profanityfilter", "prf"],
  perms: ["SendMessages", "ManageMessages"],
  userperms: ["Administrator"],
  async execute(client, message, args, con) {
    if (!permission(message))
      return message.reply({ content: "you have no permission to do that." });

    let guildID = message.guild.id;
    //check if needed variables are present
    if (!guildID) return message.reply({ content: "something went badly." });

    //get data from local database
    let data = profanity.GET(guildID);

    //check if the request was to remove alert
    if (args[0].toLowerCase() == "disable") {
      //stop if no data found
      if (data == false)
        return message.channel.send({
          content:
            "No filter was set for this server or it was already removed.",
        });

      await con.manager.findOneBy("Guilds",{guild_id:guildID}).then((g)=>{
        g.profanity=0
        con.manager.save(g)
      })
      profanity.execute(con);
      return message.channel.send({ content: "filter is off" });
    } else {
      await con.manager.findOneBy("Guilds",{guild_id:guildID}).then((g)=>{
        g.profanity=1
        con.manager.save(g)
      })
      profanity.execute(con);
      return message.channel.send({ content: "filter is on" });
    }
  },
};
function permission(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return false;
  return true;
}
