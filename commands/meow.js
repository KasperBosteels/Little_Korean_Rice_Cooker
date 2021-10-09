const score = require("../socalCredit");
module.exports = {
  name: "meow",
  description: "catnip",
  cooldown: 1,
  usage: " ",
  category: "fun",
  execute(client, message, args, con) {
    score.ADD(con, 1, message.author.id);
    return message.channel.send({ content: "pspspspspspspsps" });
  },
};
