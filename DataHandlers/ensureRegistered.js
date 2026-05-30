// Ensures the guild/user a piece of activity came from exist in the database.
//
// Previously a guild row was only created on the GuildCreate event (i.e. the
// moment the bot is invited to a server) and a user row only on
// GuildMemberAdd. That meant servers the bot was already in -- and members who
// were already present -- never got a row, so messaging the bot did nothing.
// These helpers create the row on demand from ANY activity (messages,
// interactions) and cache the ids we've seen so we hit the DB at most once per
// id per process.
const knownGuilds = new Set();
const knownUsers = new Set();

module.exports = {
  async ensureGuild(con, guild) {
    if (!guild || knownGuilds.has(guild.id)) return;
    try {
      const existing = await con.manager.findOneBy("Guild", { guild_id: guild.id });
      if (!existing) {
        // news_channelId is NOT NULL with no usable default, so set it
        // explicitly; the remaining columns fall back to their DB defaults.
        await con.manager.insert("Guild", {
          guild_id: guild.id,
          guild_name: guild.name,
          news_channelId: "",
        });
        console.log("\x1b[32m", `registered guild: ${guild.name} (${guild.id})`, "\x1b[0m");
      }
      knownGuilds.add(guild.id);
    } catch (err) {
      // A duplicate just means a concurrent activity beat us to it.
      if (err && err.code === "ER_DUP_ENTRY") knownGuilds.add(guild.id);
      else console.error("\x1b[31m", "ensureGuild failed:", err.message, "\x1b[0m");
    }
  },

  async ensureUser(con, user) {
    if (!user || knownUsers.has(user.id)) return;
    try {
      const existing = await con.manager.findOneBy("User", { user_id: `${user.id}` });
      if (!existing) {
        await con.manager.insert("User", {
          user_id: `${user.id}`,
          user_name: user.username,
        });
        console.log("\x1b[32m", `registered user: ${user.username} (${user.id})`, "\x1b[0m");
      }
      knownUsers.add(user.id);
    } catch (err) {
      if (err && err.code === "ER_DUP_ENTRY") knownUsers.add(user.id);
      else console.error("\x1b[31m", "ensureUser failed:", err.message, "\x1b[0m");
    }
  },
};
