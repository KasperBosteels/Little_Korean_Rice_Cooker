const score = require("../DataHandlers/socialCredit");
const { RepeatMode } = require("discord-music-player");
module.exports = {
  name: "repeat",
  description: "make the song or playlist repeat",
  cooldown: 1,
  usage: " song | queue | disable",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    let guildQueue = client.player.getQueue(message.guild.id);
    let action;
    if (args.length < 1) {
      if (guildQueue.RepeatMode == 0 || guildQueue.RepeatMode == undefined) {
        guildQueue.setRepeatMode(RepeatMode.SONG);
        action = "Made a loop of the current song.";
      } else {
        guildQueue.setRepeatMode(RepeatMode.OFF);
        action = "Turned the loop off.";
      }
    } else if (args[0].toLowerCase() == "song") {
      guildQueue.setRepeatMode(RepeatMode.SONG);
      action = "Made a loop of the current song.";
    } else if (
      args[0].toLowerCase() == "queue" ||
      args[0].toLowerCase() == "playlist"
    ) {
      guildQueue.setRepeatMode(RepeatMode.QUEUE);
      action = "Made a loop for the entire queue.";
    } else if (args[0].toLowerCase() == "disable") {
      guildQueue.setRepeatMode(RepeatMode.OFF);
      action = "Turned the loop off.";
    } else {
      await message.channel.send({ content: "Bro what?" });
    }
    await message.channel.send({ content: action });
    score.ADD(con, 1, message.author.id);
  },
};
