const fs = require("fs");
module.exports = {
  async execute(con) {
    await con.manager.findBy("Guild",{guild_chatbot:true}).then((g)=>{
      let data = [];
      g.forEach(s => {
        data.push({guildID:s.guild_id,ai:s.guild_chatbot})
      });
      this.SAVE(JSON.stringify(data))
    })
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/ai_enabled.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    console.log("\x1b[34m","AI data saved","\x1b[0m");
  },
  GET(guildID) {
    if (!fs.existsSync("./jsonFiles/ai_enabled.json")) {
        return false;
    }
    let rawData = fs.readFileSync(
      "./jsonFiles/ai_enabled.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        if (file[i].ai == 1 || file[i].ai == true) return true;
      }
    }
    return false;
  },
};
