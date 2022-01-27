const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
const stop = require("./music_stop");
const pause = require("./music_pause.js");
module.exports = {
  name: "play",
  description: "I will sing the song of my people.",
  cooldown: 5,
  usage: "<name of the song>",
  category: "music",
  aliases: ["p"],
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    let Vchannel, song;
    Vchannel = message.member.voice.channel;
    if (!Vchannel) return message.reply("You are not in a voice channel.");
    if (!args.length) {
      if (!(await music.isConnected({ interaction: message }))) {
        return message.reply({
          content: "I'm not connected to VC or not playing any music.",
        });
      }
      return await pause.execute(null, message, null, con);
    }
    song = args.join(" ");
    try {
      music.play({
        interaction: message,
        channel: Vchannel,
        song: song,
        requester: message.user,
      });
    } catch (err) {
      console.log(err);
      message.channel.send("A problem occured i am very sorry. ");
      message.channel.send("<:whot:908793757728636988>");
      return stop.execute(client, message, args, con);
    } finally {
      return score.ADD(con, 1, message.author.id);
    }
  },
};
