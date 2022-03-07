const link = require("../jsonFiles/bodily_affection.json").kill;
const synonyms = require("../jsonFiles/bodily_affection.json").killsynonyms;
const discord = require("discord.js");
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
      message.channel.send({ embeds: [await makeEmbed(message, args)] });
    }
  },
};
async function makeEmbed(message, args) {
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
  let embed = new discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription(`${message.author} ${placeholder1} ${placeholder2}`)
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .setImage(link[coin]);
  console.log("responded with " + link[coin]);
  return embed;
}
