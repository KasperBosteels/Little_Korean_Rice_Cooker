const fs = require("fs").promises;
const { existsSync, readFileSync } = require("fs");
const filePath = "./jsonFiles/ai_enabled.json";
let cache = null;

module.exports = {
  async execute(con) {
    try {
        const g = await con.manager.findBy("Guild", { guild_chatbot: true });
        let data = [];
        g.forEach(s => {
            data.push({ guildID: s.guild_id, ai: s.guild_chatbot })
        });
        cache = data;
        await this.SAVE(JSON.stringify(data));
    } catch (err) {
        console.error("Error in ai_enabled.execute:", err);
    }
  },
  async SAVE(data) {
    try {
        await fs.writeFile(filePath, data);
        console.log("\x1b[34m", "AI data saved", "\x1b[0m");
    } catch (err) {
        console.error("Error saving ai_enabled.json:", err);
    }
  },
  GET(guildID) {
    if (cache === null) {
        if (!existsSync(filePath)) {
            return false;
        }
        try {
            let rawData = readFileSync(filePath, "utf-8");
            cache = JSON.parse(rawData);
        } catch (e) {
            console.error("Error reading ai_enabled.json:", e);
            return false;
        }
    }
    
    for (let i = 0; i < cache.length; i++) {
      if (cache[i].guildID == guildID) {
        if (cache[i].ai == 1 || cache[i].ai == true) return true;
      }
    }
    return false;
  },
};
