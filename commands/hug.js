import GenerateEmbed from "../Generators/GenerateSimpleEmbed";
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
      var embed = GenerateEmbed(
        "#ff69b4",
        `${message.client.user} **forcefully hugs** ${message.euthor}`,
        (footer = {
          text: message.member.displayName,
          url: message.author.displaAvatarUrl,
        }),
        false,
        true,
        huggif,
        false
      );
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
        var embed = GenerateEmbed(
          "#ff69b4",
          `${message.author} **hugs** ${manualinput}`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displaAvatarUrl,
          }),
          false,
          true,
          huggif,
          false
        );
      } else {
        var embed = GenerateEmbed(
          "#ff69b4",
          `${message.author} **hugs** ${message.mentions.members.first()}`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displaAvatarUrl,
          }),
          false,
          true,
          huggif,
          false
        );
      }
    }
    score.ADD(con, 100, message.author.id);
    return message.channel.send({ embeds: [embed] });
  },
};
