const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "resume",
  description: "Resume a paused song.",
  cooldown: 1,
  usage: " ",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    music.resume({ interaction: message });
    score.ADD(con, 1, message.author.id);
  },
};
