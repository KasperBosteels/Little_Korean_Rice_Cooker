const fs = require("fs");
module.exports = {
  async execute(con) {
    await con.manager.findBy("User",{is_ignored:true}).then((m)=>{
      let d =[]
      m.forEach(i => {
        d.push({userID:d.user_id})
      });
      this.SAVE(JSON.stringify(d))
    })
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
