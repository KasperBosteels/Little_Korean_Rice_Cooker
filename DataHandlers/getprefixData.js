const fs = require("fs");
module.exports = {
  async execute (client, con) {

    await con.manager.find("Guilds").then((d)=>{
      let parsedData=[];
      d.forEach(g => {
        parsedData.push({guildID:g.guild_id,prefix:g.guild_prefix})
      });
      this.SAVE(parsedData);
    })
  },
  SAVE(data) {
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
