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
        console.log("ignored users data saved.");
        return;
      }
    });
  },
  GET(userID) {
    let Ignore = false;
    let rawData = fs.readFileSync("./jsonFiles/ignore.json", "utf-8");
    let file = JSON.parse(rawData);
    for (const iterator of file) {
      if (iterator.userID == userID) {
        Ignore = true;
      }
    }
    return Ignore;
  },
};