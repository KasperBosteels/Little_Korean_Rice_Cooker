const ensure = require("./ensureRegistered.js");

module.exports = {
  async join(guild, con) {
    // Delegate to the shared helper so the insert always satisfies the schema
    // (e.g. the NOT NULL news_channelId column) and stays in one place.
    await ensure.ensureGuild(con, guild);
  },
  async leave(guild, con) {
    await con.manager.delete("Guild", { guild_id: guild.id });
  },
};
