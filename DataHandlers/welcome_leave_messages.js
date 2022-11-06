const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query(
      "SELECT guildID,enabled,welcomeMessage,leaveMessage FROM welcome_leave_messages;",
      (err, rows) => {
        if (err) console.error(err);
        data = JSON.stringify(rows);
        this.SAVE(data);
      }
    );
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/welcome_leave_messages.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    console.log("welcome message system data saved");
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
