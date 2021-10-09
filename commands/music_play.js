const music = require("@koenie06/discord.js-music");
const volume = require("./music_volume");
const score = require("../socalCredit");
module.exports = {
  name: "play",
  description: "I will sing the song of my people.",
  cooldown: 1,
  usage: " [name of the song]",
  category: "music",
  async execute(client, message, args, con) {
    let Vchannel, song;
    Vchannel = message.member.voice.channel;
    if (!Vchannel) return message.reply("You are not in a voice channel.");
    song = args.join(" ");
    try {
      music.play({
        interaction: message,
        channel: Vchannel,
        song: song,
        requester: message.author,
      });
    } finally {
      return score.ADD(con, 1, message.author.id);
    }
  },
};
