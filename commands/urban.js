const ud = require("urban-dictionary");
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "urban",
  description: "Urban Dictionary.",
  cooldown: 2,
  usage: "<word> ",
  category: "fun",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    let word = " ";
    for (let i = 0; i < args.length; i++) {
      word += `${args[i]} `;
    }
    if (word) {
      return await term(word, message);
    }
  },
};
async function term(word, message) {
  let explain = ["undefined", "undefined", "https://www.urbandictionary.com/"];

  await ud
    .define(word)
    .then((result) => {
      explain[0] = result[0].definition;
      explain[1] = result[0].example;
      explain[2] = result[0].permalink;
      sendembed(
        G.GenerateEmbed(
          "Random",
          explain[0],
          message,
          (fields = [{ name: "examples:", content: explain[1] }]),
          true,
          false,
          "urban dictionary",
          explain[2]
        ),
        message.channel
      ).catch((error) => {
        if ((error.code = 50035))
          return message.channel.send({
            content:
              "The definition of this word is too big for discord, sorry.",
          });
      });
    })
    .catch((error) => {
      if ((error.code = "ERR_WORD_UNDEFINED")) {
        return message.channel.send({
          content: "Its not here...\nPerhaps the archives are incomplete...",
        });
      } else {
        console.error(error);
      }
    });
}
function sendembed(embed, channel) {
  return channel.send({ embeds: [embed] });
}
