const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "stop",
  description: "Stop the audio player.",
  cooldown: 1,
  usage: " ",
  category: "music",
  async execute(client, message, args, con) {
    music.stop({ interaction: message });
    score.ADD(con, 1, message.author.id);
  },
};
