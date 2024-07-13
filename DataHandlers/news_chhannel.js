const fs = require("fs");
module.exports = {
  async execute(con) {

    await con.manager.findBy("Guilds", { news_channel: true }).then((g) => {
      let data = [];
      g.forEach(s => {
        data.push({ guildID: s.guild_id, news_channel: s.news_channelId })
      });
      this.SAVE(JSON.stringify(data))
    })
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/news_channel.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("\x1b[34m", "news channels saved into file", "\xb1[0m");
    });
  },
  GET() {
    let rawData = fs.readFileSync("./jsonFiles/news_channel.json", "utf-8");
    let file = JSON.parse(rawData);
    let channels = [];
    for (let i = 0; i < file.length; i++) {
      channels.push(file[i].news_channelId)
    }
    return channels;
  },
};
