const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query("SELECT * FROM ignoredUsers;", (err, rows) => {
      if (err) console.error(err);
      data = JSON.stringify(rows);
      this.SAVE(data);
    });
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/ignore.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("ignored users channels saved into file");
    });
  },
  GET(userID) {
    let rawData = fs.readFileSync("./jsonFiles/ignore.json", "utf-8");
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == userID) {
        return file[i].userID;
      }
    }
    return false;
  },
};
