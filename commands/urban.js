const ud = require("urban-dictionary");
const discord = require("discord.js");
module.exports = {
  name: "urban",
  description: "Urban Dictionary.",
  cooldown: 2,
  usage: "<word> ",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    let word = " ";
    for (let i = 0; i < args.length; i++) {
      word += `${args[i]} `;
    }
    if (word) {
      return await term(word, message.channel);
    }
  },
};
async function term(word, channel) {
  let explain = ["undefined", "undefined"];

  await ud
    .define(word)
    .then((result) => {
      explain[0] = result[0].definition;
      explain[1] = result[0].example;
      sendembed(
        makeEmbed(word, explain[0], explain[1], discord),
        channel
      ).catch((error) => {
        if ((error.code = 50035))
          return channel.send({
            content:
              "The definition of this word is too big for discord, sorry.",
          });
      });
    })
    .catch((error) => {
      if ((error.code = "ERR_WORD_UNDEFINED")) {
        console.log(error);
        return channel.send({
          content: "perhaps the archives are incomplete...",
        });
      } else {
        console.error(error);
      }
    });
}
function makeEmbed(word, def, example, discord) {
  var embed = new discord.MessageEmbed();
  embed.setTitle(`definition for: ${word}`);
  embed.setDescription(def);
  embed.addField("example", example);
  embed
    .setAuthor("Urban Dictionary")
    .setAuthor({
      name: "Urban Dictionary",
    })
    .setFooter({
      text: message.member.displayName,
      iconURL: message.author.displaAvatarUrl,
    });
  return embed;
}
function sendembed(embed, channel) {
  return channel.send({ embeds: [embed] });
}
