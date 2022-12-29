const leave = require("../leave");
const { Guild } = require("../src/entity/Guild");

module.exports = {
  async join(guild, con) {
    await Guild.createGuild(guild.id,undefined,null,'-',undefined,null,null,null)
  },
  async leave(guild, con) {
    const g = Guild.findOneBy({guild_id:guild.id})
    Guild.remove(await g)
  },
};
