const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "stop",
  description: "Stop the audio player.",
  cooldown: 1,
  usage: " ",
  category: "music",
  perms: ["SendMessages", "Connect", "Speak"],
  userperms: ["Connect"],
  async execute(client, message, args, con) {
    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.stop();
    score.ADD(con, 1, message.author.id);
  },
};
