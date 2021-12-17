const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "repeat",
  description: "Repeat the song over and over and over...",
  cooldown: 1,
  usage: " ",
  category: "music",
  async execute(client, message, args, con) {
    if (!(await music.isRepeated({ interaction: message }))) {
      music.repeat({ interaction: message, value: true });
    } else {
      music.repeat({ interaction: message, value: false });
    }
    score.ADD(con, 1, message.author.id);
  },
};
