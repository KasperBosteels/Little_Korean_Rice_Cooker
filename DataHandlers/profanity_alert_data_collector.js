const { Guild } = require("../src/entity/Guild");
const fs = require("fs");
module.exports = {
  async execute(con) {
  
    await Guild.findBy({guild_profanity:true}).then((g)=>{
      let data = [];
      g.forEach(s => {
        data.push({guildID:s.guild_id,profanity_channel:s.profanity_channel})
      });
      this.SAVE(JSON.stringify(data))
    });
  },
  SAVE(data) {
    fs.writeFileSync(
      "./jsonFiles/profanity_alert_channels.json",
      data,
      (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("profanity alert channels saved into file");
      }
    );
  },
  GET(guildID) {
    let rawData = fs.readFileSync(
      "./jsonFiles/profanity_alert_channels.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        return file[i].profanity_channel;
      }
    }
    return false;
  },
};
