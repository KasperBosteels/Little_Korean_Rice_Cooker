const fs = require("fs");
module.exports = {
  execute(con) {
    var data, lowdata;
    con.query("SELECT * FROM ignoredUsers;", (err, rows) => {
      if (err) console.error(err);
      data = JSON.stringify(rows);
      lowdata = this.GETLOWSCOREUSERS(con);
      console.log(data, lowdata);
      this.SAVE(data);
    });
  },
  SAVE(data) {
    console.log(data);
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
  //need to funish this
  GETLOWSCOREUSERS(con) {
    var data;
    con.query(
      `SELECT userID from score where socialScore < 500;`,
      (err, rows) => {
        if (err) console.log(err);
        data = JSON.stringify(rows);
        console.log(data);
        return data;
      }
    );
  },
};
