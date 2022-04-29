const ud = require("urban-dictionary");
const social = require("../socalCredit");
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "wotd",
  description: "word of the day",
  cooldown: 3,
  usage: " ",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    await term(message);
    social.ADD(con, 1, message.author.id);
    return;
  },
};
async function term(message) {
  await ud
    .wordsOfTheDay()
    .then((results, error) => {
      if (error) return console.error(error.message);
      let coin = Math.floor(Math.random() * Math.floor(results.length));
      message.channel.send({
        embeds: [
          G.GenerateEmbed(
            "RANDOM",
            results[coin].definition,
            false,
            (fields = [{ name: "example", content: results[coin].example }]),
            false,
            false,
            `word of the day: **${results[coin].word}**`,
            results[coin].permalink
          ),
        ],
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
