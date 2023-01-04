const fs = require("fs");
module.exports = {
  async execute(con) {
    let data=await con.manager.find("Guild")
    let prasedData=[];
    data.forEach(g => {
      prasedData.push({guildID:g.guild_id,log_channel:g.log_channel})
    });      
    this.SAVE(JSON.stringify(prasedData));
      console.log("logchannel data saved");
  
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/logChannels.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("log channels saved into file");
    });
  },
  GET(guildID) {
    let rawData = fs.readFileSync("./jsonFiles/logChannels.json", "utf-8");
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        return file[i].log_channel;
      }
    }
    return false;
  },
};
