const discord = require("discord.js");
const hug = require("../jsonFiles/bodily_affection.json");
const score = require("../socalCredit");
module.exports = {
  name: "pet",
  description: "Pet someone.",
  cooldown: 1,
  usage: "<@user> / <blank> / <something you like>",
  aliases: ["p", "pat", "pat"],
  category: "fun",
  async execute(client, message, args, con) {
    coin = Math.floor(Math.random() * Math.floor(hug.pats.length));
    var manualinput = " ";
    var huggif = hug.pats[coin];
    //looks for given arguments
    if (!args[0]) {
      //no arguments reply command

      var embed = new discord.MessageEmbed()
        .setColor("#ff69b4")
        .setFooter(message.member.displayName, message.author.displaAvatarUrl)
        .setTimestamp()
        .setDescription(
          `${message.client.user} **forcefully pets** ${message.author}`
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
          .setFooter(message.member.displayName, message.author.displaAvatarUrl)
          .setTimestamp()
          .setDescription(`${message.author} **pets** ${manualinput}`)
          .setImage(huggif);
      } else {
        var embed = new discord.MessageEmbed()
          .setColor("#ff69b4")
          .setFooter(message.member.displayName, message.author.displaAvatarUrl)
          .setTimestamp()
          .setDescription(
            `${message.author} **pets** ${message.mentions.members.first()}`
          )
          .setImage(huggif);
      }
    }

    message.channel.send({ embeds: [embed] });
    try {
      score.ADD(con, 50, message.author.id);
    } catch (err) {
      console.error(err);
    }
  },
};
