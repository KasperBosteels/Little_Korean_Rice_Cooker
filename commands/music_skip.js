const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "skip",
  description: "Skip the current song, or a song from the queue",
  cooldown: 1,
  usage: "<optional the number of a song>",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.skip();

    score.ADD(con, 1, message.author.id);
  },
};
