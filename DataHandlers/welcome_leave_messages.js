const fs = require("fs");
module.exports = {
  async execute(con) {
    
    await con.manager.findBy("Guild",{welcome:true}).then((s)=>{
      let data = [];
      s.forEach(g => {
        data.push({
          guildID:g.guild_id,
          enabled:g.welcome,
          welcomeMessage:g.welcome_message,
          leaveMessage:g.leave_message
        })
      });
      this.SAVE(JSON.stringify(data))
    })
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/welcome_leave_messages.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    console.log("\x1b[34m","welcome message system data saved","\x1b[0m",);
  },
  CONFIRM(guildID) {
    let value;
    let rawData = fs.readFileSync(
      "./jsonFiles/welcome_leave_messages.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    file.forEach((guilddata) => {
      if (guilddata.guildID == guildID && guilddata.enabled == 1) value = true;
      if (guilddata.guildID == guildID && guilddata.enabled == 0) value = false;
    });
    return value;
  },
  GET(guildID) {
    let rawData = fs.readFileSync(
      "./jsonFiles/welcome_leave_messages.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID && file[i].enabled == true) {
        return true;
      }
    }
    return false;
  },
};
