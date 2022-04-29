const haiku = require("haiku-random");
const score = require("../socalCredit");
const { GenerateEmbed } = require("../Generators/GenerateSimpleEmbed");
var hard_Haiku = [
  `You're a vast ocean,\nSo oddly terrifying\nSuch a strange comfort.\nby Achi`,
];
module.exports = {
  name: "haiku",
  description: "Receive a random haiku from a list of over 1500.",
  cooldown: 1,
  usage: " (optional: <number>)",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    let smile = " ";
    if (args.length > 0) {
      let H = await haiku.specific(args[0]);
      H.forEach((line) => {
        smile += `${line}\n`;
      });
    } else {
      let H = await haiku.random();
      H.forEach((line) => {
        smile += `${line}\n`;
      });
    }
    if (Math.floor(Math.random() * 10) + 1 === 1) {
      smile = hard_Haiku[Math.floor(Math.random() * hard_Haiku.length)];
    }
    message.channel.send({
      embeds: [
        GenerateEmbed(
          "#50c878",
          haiku,
          (footer = {
            text: message.member.displayName,
            url: message.author.displayAvatarUrl,
          }),
          false,
          false,
          false,
          "a haiku for you"
        ),
      ],
    });
    try {
      score.ADD(con, 10, message.author.id);
    } catch (err) {
      console.log(err);
    }
  },
};
