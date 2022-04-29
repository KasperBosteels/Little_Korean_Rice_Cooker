const link = require("../jsonFiles/bodily_affection.json").kill;
const synonyms = require("../jsonFiles/bodily_affection.json").killsynonyms;
import GenereateEmbed from "../Generators/GenerateSimpleEmbed";
const score = require("../socalCredit");
module.exports = {
  name: "kill",
  description: "Kill someone.",
  cooldown: 2,
  usage: "<@user> / <blank> / <something you don't like>",
  aliases: [
    "end",
    "assasinate",
    "liquidate",
    "exterminate",
    "execute",
    "slaughter",
    "eat",
    "butcher",
    "ice",
    "zapp",
    "smoke",
    "terminate",
  ],
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    try {
      score.ADD(con, 50, message.author.id);
    } catch (err) {
      console.error(err);
    } finally {
      let coin = await Math.floor(Math.random() * Math.floor(link.length));
      let coin2 = await Math.floor(Math.random() * Math.floor(synonyms.length));
      let placeholder1, placeholder2;
      placeholder1 = synonyms[coin2];
      placeholder2 = message.mentions.members.first();
      if (!args[0]) {
        placeholder2 = "the VOID";
      }
      if (args.length > 0 && !message.mentions.members.first()) {
        placeholder2 = args.join(" ");
      }
      message.channel.send({
        embeds: [
          GenereateEmbed(
            "#00ff00",
            `${message.author} ${placeholder1} ${placeholder2}`,
            `[url](${link[coin]})`,
            false,
            link[coin],
            false
          ),
        ],
      });
    }
  },
};
