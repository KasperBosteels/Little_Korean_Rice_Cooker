const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "remove",
  description: "If you need to remove a specific song.",
  cooldown: 5,
  usage: "<number of your song>",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    guildQueue = client.player.getQueue(message.guild.id);
    let song = parseInt(args[0]);
    if (isNaN(song)) {
      return message.channel.send({
        content: "That doesn't look like a number.",
      });
    } else if (song > guildQueue.songs.length + 1) {
      return message.channel.send({ content: "That number is too high." });
    } else {
      try {
        guildQueue.remove(song);
        message.channel.send({ content: "I removed that song for you." });
      } catch (error) {
        console.log(error);
      }
    }
    return score.ADD(con, 3, message.author.id);
  },
};
