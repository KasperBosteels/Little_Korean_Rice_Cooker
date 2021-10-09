const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "repeat",
  description: "Repeat the song over and over and over...",
  cooldown: 1,
  usage: " true/false",
  category: "music",
  async execute(client, message, args, con) {
    if (args[0] != "false" && args[0] != "true")
      return message.channel.send("You forgot to say true/false.");
    let b;
    if (args[0] == "false") {
      b = false;
    } else {
      b = true;
    }
    music.repeat({ interaction: message, value: b });
    score.ADD(con, 1, message.author.id);
  },
};
