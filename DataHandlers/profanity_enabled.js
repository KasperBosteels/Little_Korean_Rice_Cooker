const fs = require("fs");
module.exports = {
  async execute(con) {
  

    await con.manager.findBy("Guild",{guild_profanity:true}).then((g)=>{
      let data = [];
      g.forEach(s => {
        data.push({guildID:s.guild_id,profanity:s.profanity})
      });
      this.SAVE(JSON.stringify(data))
    })
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/profanity_enabled.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    console.log("profanity data saved");
  },
  GET(guildID) {
    let rawData = fs.readFileSync(
      "./jsonFiles/profanity_enabled.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        if (file[i].profanity == 1) return true;
      }
    }
    return false;
  },
};

function getAll() {
  let rawData = fs.readFileSync("./jsonFiles/disboard.json", "utf-8");
  let file = JSON.parse(rawData);
  return file;
}
