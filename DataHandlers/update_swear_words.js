const fs = require("fs");
const { Guild } = require("discord.js");
const { Swearword } = require("../src/entity/Swearword");
module.exports = {
  async execute(con) {
    

    await Guild.find({
      relations:{custom_swearlist:true},
      where:{guild_profanity:true}}).then((d)=>{
        let data = []
        d.forEach(g => {
          data.push({guildID:g.guild_id,swearwords:g.custom_swearlist,default_enabled:g.guild_profanity})
        });
        this.SAVE(JSON.stringify(data))
      })
    await Swearword.find().then((s)=>{
      let data = []
      s.forEach(w => {
        data.push(w.word)
      });
      this.SAVEDEFAULT(JSON.stringify(data))
    })  
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
