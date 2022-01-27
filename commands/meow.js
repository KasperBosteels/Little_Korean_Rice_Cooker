const score = require("../socalCredit");
module.exports = {
  name: "meow",
  description: "catnip",
  cooldown: 0,
  usage: " ",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    score.ADD(con, 1, message.author.id);
    return await message.channel.send({ content: "pspspspspspspsps" });
  },
};
