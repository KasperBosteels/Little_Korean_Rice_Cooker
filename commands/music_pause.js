const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
const resume = require("./music_resume");
module.exports = {
  name: "pause",
  description: "pause the current song",
  cooldown: 1,
  usage: " ",
  category: "music",
  async execute(client, message, args, con) {
    if (!(await music.isPaused({ interaction: message }))) {
      music.pause({ interaction: message });
    } else {
      music.resume({ interaction: message });
    }
    score.ADD(con, 1, message.author.id);
  },
};
