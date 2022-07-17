const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query(
      "SELECT guildID,welcome_message FROM custom_welcome_message;",
      (err, rows) => {
        if (err) console.error(err);
        data = JSON.stringify(rows);
        this.SAVE(data);
        console.log("custom welcome data saved");
      }
    );
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
