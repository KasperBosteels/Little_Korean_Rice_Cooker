const fs = require("fs");
module.exports = {
  execute(con) {
    var data;
    con.query(
      "SELECT guildID,swearwords,default_enabled FROM customswearwords;",
      (err, rows) => {
        if (err) console.error(err);
        data = JSON.stringify(rows);
        this.SAVE(data);
        console.log("custom swear words data saved");
      }
    );
    con.query("SELECT words FROM swearwords;", (err, rows) => {
      if (err) console.error(err);
      let jsdata = [];
      rows.forEach((row) => {
        jsdata.push(row.words);
      });
      data = JSON.stringify(jsdata);
      this.SAVEDEFAULT(data);
      console.log("swear words data saved");
    });
  },
  SAVE(data) {
    fs.writeFileSync("./jsonFiles/custom_swear_words.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("custom swear words saved into file");
    });
  },
  GET(guildID) {
    let rawData = fs.readFileSync(
      "./jsonFiles/custom_swear_words.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    for (let i = 0; i < file.length; i++) {
      if (file[i].guildID == guildID) {
        let arrayofwords = file[i].swearwords.replaceAll('"', "").split(";");
        return { default: file[i].default_enabled, custom: arrayofwords };
      }
    }
    return false;
  },
  SAVEDEFAULT(data) {
    fs.writeFileSync("./jsonFiles/default_swear_words.json", data, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("swear words saved into file");
    });
  },
  get_default_swear_words() {
    let rawData = fs.readFileSync(
      "./jsonFiles/default_swear_words.json",
      "utf-8"
    );
    let file = JSON.parse(rawData);
    let words = [];
    file.forEach((element) => {});
    return file;
  },
};
