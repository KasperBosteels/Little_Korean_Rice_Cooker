const score = require("../socalCredit");
const resume = require("./music_resume");
module.exports = {
  name: "pause",
  description: "pause the current song",
  cooldown: 1,
  usage: " ",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT", "SPEAK"],
  async execute(client, message, args, con) {
    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.setPaused(true);
    score.ADD(con, 1, message.author.id);
  },
};
