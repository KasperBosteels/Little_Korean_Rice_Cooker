const discord = require("discord.js");
const pats = require("../jsonFiles/bodily_affection.json").pats;
const score = require("../socalCredit");
module.exports = {
  name: "pet",
  description: "Pet someone.",
  cooldown: 1,
  usage: "<@user> / <blank> / <something you like>",
  aliases: ["pat", "pat"],
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    coin = await Math.floor(Math.random() * Math.floor(pats.length));
    var manualinput = " ";
    var pats_gif = pats[coin];
    //looks for given arguments
    if (!args[0]) {
      //no arguments reply command

      var embed = new discord.MessageEmbed()
        .setColor("#ff69b4")
        .setFooter({
          text: message.member.displayName,
          iconURL: message.author.displayAvatarUrl,
        })
        .setTimestamp()
        .setDescription(
          `${message.client.user} **forcefully pets** ${message.author}`
        )
        .setImage(pats_gif);
    } else {
      //argument given, assign mention to variable
      var member = message.mentions.members.first();

      //if variable == undefined
      if (!member) {
        let argument_length = args.length;
        //assign args array to string
        for (let i = 0; i < argument_length; i++) {
          if (args[i] == undefined) {
          } else {
            manualinput += ` ${args[i]}`;
          }
        }
        //return string with text

        var embed = new discord.MessageEmbed()
          .setColor("#ff69b4")
          .setFooter({
            text: message.member.displayName,
            iconURL: message.author.displayAvatarUrl,
          })
          .setTimestamp()
          .setDescription(`${message.author} **pets** ${manualinput}`)
          .setImage(pats_gif);
      } else {
        var embed = new discord.MessageEmbed()
          .setColor("#ff69b4")
          .setFooter({
            text: message.member.displayName,
            iconURL: message.author.displayAvatarUrl,
          })
          .setTimestamp()
          .setDescription(
            `${message.author} **pets** ${message.mentions.members.first()}`
          )
          .setImage(pats_gif);
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
