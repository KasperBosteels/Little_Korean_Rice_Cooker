const fs = require("fs");
module.exports = {
  async execute(con) {
    
    await con.manager.findBy("Guild",{welcome:true}).then((g)=>{
    let data = [];
    g.forEach(s => {
      data.push({guildID:s.guild_id,welcome_channel:s.welcome_channel})
    });
    this.SAVE(JSON.stringify(data))
    })
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/welcome_channel.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("\x1b[34m","welcome channels saved into file","\xb1[0m");
    });
  },
  GET(guildID) {
    let rawData = fs.readFileSync("./jsonFiles/welcome_channel.json", "utf-8");
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        return file[i].welcome_channel;
      }
    }
    return false;
  },
};
