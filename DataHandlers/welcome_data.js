const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query("SELECT guildID,welcome_channel FROM guild;", (err, rows) => {
      if (err) console.error(err);
      data = JSON.stringify(rows);
      this.SAVE(data);
      console.log("welcome channel data saved");
    });
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/welcome_channel.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("welcome channels saved into file");
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
