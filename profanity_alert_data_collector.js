const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query("SELECT guildID,profanity_channel FROM guild;", (err, rows) => {
      if (err) console.error(err);
      data = JSON.stringify(rows);
      this.SAVE(data);
    });
  },
  SAVE(data) {
    fs.writeFileSync(
      "./jsonFiles/profanity_alert_channels.json",
      data,
      (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("profanity alert channels saved into file");
      }
    );
  },
  GET(guildID) {
    let rawData = fs.readFileSync(
      "./jsonFiles/profanity_alert_channels.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        return file[i].profanity_channel;
      }
    }
    return false;
  },
};
