const discord = require("discord.js");
const hug = require("../jsonFiles/bodily_affection.json").hugs;
const score = require("../socalCredit");
module.exports = {
  name: "hug",
  description: "Hug someone.",
  cooldown: 1,
  usage: "<@user> / <blank> / <something you like>",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    coin = await Math.floor(Math.random() * Math.floor(hug.length));
    var manualinput = " ";
    var huggif = hug[coin];
    //looks for given arguments
    if (!args[0]) {
      //no arguments reply command

      var embed = new discord.MessageEmbed()
        .setColor("#ff69b4")
        .setAuthor({
          name: "Little_Korean_Rice_Cooker",
          url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
          iconURL: "https://i.imgur.com/A2SSxSE.png",
        })
        .setFooter({
          text: message.member.displayName,
          iconURL: message.author.displayAvatarUrl,
        })
        .setTimestamp()
        .setDescription(
          `${message.client.user} **forcefully hugs** ${message.author}`
        )
        .setImage(huggif);
    } else {
      //argument given, assign mention to variable
      var member = message.mentions.members.first();

      //if variable == undefined
      if (!member) {
        //assign args array to string
        for (let i = 0; i < args.length; i++) {
          if (args[i] == undefined) {
          } else {
            manualinput += ` ${args[i]}`;
          }
        }
        //return string with text
        var embed = new discord.MessageEmbed()
          .setColor("#ff69b4")
          .setAuthor({
            name: "Little_Korean_Rice_Cooker",
            url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
            iconURL: "https://i.imgur.com/A2SSxSE.png",
          })
          .setFooter({
            text: message.member.displayName,
            iconURL: message.author.displaAvatarUrl,
          })
          .setTimestamp()
          .setDescription(`${message.author} **hugs** ${manualinput}`)
          .setImage(huggif);
      } else {
        var embed = new discord.MessageEmbed()
          .setColor("#ff69b4")
          .setAuthor({
            name: "Little_Korean_Rice_Cooker",
            url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
            iconURL: "https://i.imgur.com/A2SSxSE.png",
          })
          .setFooter({
            text: message.member.displayName,
            iconURL: message.author.displaAvatarUrl,
          })
          .setTimestamp()
          .setDescription(
            `${message.author} **hugs** ${message.mentions.members.first()}`
          )
          .setImage(huggif);
      }
    }
    score.ADD(con, 100, message.author.id);
    return message.channel.send({ embeds: [embed] });
  },
};
