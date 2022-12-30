const fs = require("fs");
module.exports = {
  async execute (client, con) {
    var data= await con.manager.find("Guilds");
    this.SAVE(data);
  },
  SAVE(data) {
    let parsedData=[];
    data.forEach(g => {
      parsedData.push({guildID:g.guild_id,prefix:g.guild_prefix})
    });

    fs.writeFileSync("./jsonFiles/prefix.json",JSON.stringify(data), (err) => {
      if (err) {
        return console.error(err);
      }
    });
    console.log("prefix data saved");
  },
  GET(guildID) {
    let rawData = fs.readFileSync("./jsonFiles/prefix.json", "utf-8");
    let file = JSON.parse(rawData);
    let guildprefix;
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        return (guildprefix = file[i].prefix);
      }
    }
    return "-";
  },
};
