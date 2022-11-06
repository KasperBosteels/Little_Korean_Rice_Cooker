const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query("SELECT guildID,log_channel FROM guild;", (err, rows) => {
      if (err) console.error(err);
      data = JSON.stringify(rows);
      this.SAVE(data);
      console.log("logchannel data saved");
    });
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
