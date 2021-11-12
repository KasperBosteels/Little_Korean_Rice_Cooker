const fs = require("fs");
module.exports = {
  async execute(con) {
    var data;
    con.query(
      "SELECT userID FROM score WHERE socialScore < 500 UNION SELECT * FROM ignoredUsers",
      (err, rows) => {
        if (err) console.error(err);
        data = JSON.stringify(rows);
        this.SAVE(data);
      }
    );
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/ignore.json", data, (err) => {
      if (err) {
        return console.error(err);
      } else {
        return console.log("ignored users data saved.");
      }
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
