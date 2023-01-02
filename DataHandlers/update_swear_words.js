const fs = require("fs");
module.exports = {
  async execute(con) {
    let data = []
await con.manager.find("Guilds",{
      relations:{custom_swearlist:true},
      where:{guild_profanity:true}}).then((d)=>{
        d.forEach(g => {
          data.push({guildID:g.guild_id,swearwords:g.custom_swearlist,default_enabled:g.guild_profanity})
        });
      });
    let defaultData=[];
await con.manager.find("Swearwords").then((s)=>{
      s.forEach(w => {
        console.log(w)
        defaultData.push({swearwords:w.word})
      });
    })
    console.log(data,defaultData)
    this.SAVE(JSON.stringify(data))
    this.SAVEDEFAULT(JSON.stringify(defaultData))
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
    return file;
  },
};
