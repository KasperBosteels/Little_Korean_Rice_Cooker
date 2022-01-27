const ud = require("urban-dictionary");
const discord = require("discord.js");
const social = require("../socalCredit");
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
      sendembed(
        makeEmbed(
          results[coin].word,
          results[coin].definition,
          results[coin].example,
          results[coin].permalink,
          discord
        ),
        message.channel
      );
    })
    .catch((error) => {
      console.error(error);
    });
}
function makeEmbed(word, def, example, link, discord) {
  var embed = new discord.MessageEmbed();
  embed.setTitle(`word of the day: ${word}`);
  embed.setDescription(def);
  embed.addField("example", example);
  embed.setURL(link);
  return embed;
}
function sendembed(embed, channel) {
  return channel.send({ embeds: [embed] });
}
