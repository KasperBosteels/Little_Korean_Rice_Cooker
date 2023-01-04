const fs = require("fs");
module.exports = {
  async execute(con) {
    con.manager.findBy("Guild",{level_system:true}).then((g)=>{
      let data = []
      g.forEach(i => {
        data.push({guildID:i.guild_id,level_system:i.level_system})
      });
      this.SAVE(JSON.stringify(data))
    });
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/leveling_enabled.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    console.log("leveling system data saved");
  },
  CONFIRM(guildID) {
    let value;
    let rawData = fs.readFileSync("./jsonFiles/leveling_enabled.json", "utf-8");
    let file = JSON.parse(rawData);
    file.forEach((guilddata) => {
      if (guilddata.guildID == guildID && guilddata.level_system == 1)
        value = true;
      if (guilddata.guildID == guildID && guilddata.level_system == 0)
        value = false;
    });
    return value;
  },
  GET(guildID) {
    let rawData = fs.readFileSync("./jsonFiles/leveling_enabled.json", "utf-8");
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID && file[i].level_system == true) {
        return true;
      }
    }
    return false;
  },
};
