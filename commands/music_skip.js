const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
module.exports = {
  name: "skip",
  description: "Skip the current song, or a song from the queue",
  cooldown: 1,
  usage: "<optional the number of a song>",
  category: "music",
  perms: ["SEND_MESSAGES", "CONNECT", "SPEAK"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    if (!args) {
      try {
        music.skip({ interaction: message });
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    } else {
      try {
        const list = await music.getQueue({ interaction: message });
        if (
          !Number.isInteger(Number.parseInt(args[0])) ||
          args[0] < 0 ||
          args[0] > list.length
        )
          return await message.reply({
            content:
              "Sorry you need to give a valid number,\nMake sure the number is within the queue.",
          });
        const skipMessage = `${
          list[Number.parseInt(args[0])].info.title
        } was skipped.`;
        await music.removeQueue({
          interaction: message,
          number: Number.parseInt(Number.parseInt(args[0])),
        });
        return await message.reply({
          content: skipMessage,
        });
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    score.ADD(con, 1, message.author.id);
  },
};
