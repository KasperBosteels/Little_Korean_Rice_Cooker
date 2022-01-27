const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "skip",
  description: "Skip the current song.",
  cooldown: 1,
  usage: " ",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    music.skip({ interaction: message });
    score.ADD(con, 1, message.author.id);
  },
};
