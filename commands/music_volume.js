const score = require("../socalCredit");
module.exports = {
  name: "volume",
  description: "set the volume.",
  cooldown: 1,
  usage: "a number between 0 and 100",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    let volume = parseInt(args[0]);
    if (volume < 0 || volume > 100 || !args[0])
      return message.reply(
        "Don't forget you need to give me a number between 0 and 100."
      );

    let guildQueue = client.player.getQueue(message.guild.id);

    guildQueue.setVolume(volume);
    score.ADD(con, 1, message.author.id);
  },
};
