const fs = require("fs");
module.exports = {
  async execute(con) {
    
    await con.manager.findBy("Guild",{welcome:true}).then((s)=>{
      let data = []
      s.forEach(g => {
        data.push({guildID:g.guild_id,welcome_message:g.welcome_message})
      });
      this.SAVE(JSON.stringify(data))
    })
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/custom_welcome_data.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  },
  GET(guildID) {
    let rawData = fs.readFileSync(
      "./jsonFiles/custom_welcome_data.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        return file[i].welcome_message;
      }
    }
    return false;
  },
};
