const leave = require("./leave");

module.exports = {
  async join(guild, con) {
    con.query(
      `INSERT INTO guild (guildID,level_system,log_channel,prefix,profanity,profanity_channel,welcome_channel) VALUES("${guild.id}",0,NULL,'-',0,NULL,NULL);`,
      (err) => {
        if (err) return console.log(err);
      }
    );
  },
  async leave(guild, con) {
    con.query(`DELETE FROM guild WHERE guildID = "${guild.id}";`, (err) => {
      if (err) return console.log(err);
    });
  },
};
