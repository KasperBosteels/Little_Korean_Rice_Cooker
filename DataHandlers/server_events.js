const leave = require("../leave");

module.exports = {
  async join(guild, con) {
    await con.manager.insert("Guild",{guild_id:guild.id,guild_name:undefined,log_channel:null,guild_prefix:'-',level_system:undefined,guild_profanity:null,profanity_channel:null,guild_chatbot:null})
  },
  async leave(guild, con) {
    const g =await con.manager.findOneBy("Guild",{guild_id:guild.id})
    Guild.remove(g)
  },
};
