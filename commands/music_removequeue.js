const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "removesong",
  description: "Remove a song from the queue.",
  cooldown: 1,
  usage: " ",
  category: "music",
  async execute(client, message, args, con) {
    if (!args[0])
      return message.reply("You forgot to tell me what song i should remove.");
    const number = message.options.getInteger("number");
    music.removeQueue({ interaction: message, number: number });
    score.ADD(con, 1, message.author.id);
  },
};
