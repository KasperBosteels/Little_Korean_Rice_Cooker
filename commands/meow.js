const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "meow",
  description: "catnip",
  cooldown: 0,
  usage: " ",
  category: "fun",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    score.ADD(con, 1, message.author.id);
    return await message.channel.send({ content: "pspspspspspspsps" });
  },
};
