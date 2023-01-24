const fs = require("fs");
module.exports = {
  async execute(con) {
    await con.manager.findBy("User",{is_ignored:1}).then((m)=>{
      let d =[]
      m.forEach(i => {
        d.push({userID:i.user_id})
      });
      const data=JSON.stringify(d)
      this.SAVE(data)
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
