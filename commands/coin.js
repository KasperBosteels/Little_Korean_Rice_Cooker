const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "coin",
  description: "Coinflip",
  cooldown: 1,
  aliases: ["flip", "coinflip", "cf"],
  usage: " ",
  category: "fun",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    //randil 1 or 2
    let coin = await Math.floor(Math.random() * 2 + 1);

    //if 1 = tails else ...
    if (coin <= 1) {
      coin = "tails";
    } else coin = "heads";
    message.channel.send({ content: `:coin: ${coin} :coin: ` });
    score.ADD(con, 15, message.author.id);
  },
};
