const eat = require("../jsonFiles/bodily_affection.json").eating;
const score = require("../socalCredit");
const G = require("../Generators/GenerateSimpleEmbed");

module.exports = {
  name: "eat",
  description: "eat someone.",
  cooldown: 3,
  usage: "<@user> / <blank> / <something you like>",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    coin = await Math.floor(Math.random() * Math.floor(eat.length));
    let manualinput = " ";
    let eating_gif = eat[coin];
    //looks for given arguments
    if (!args[0]) {
      //no arguments reply command

      var embed = G.GenerateEmbed(
        "#ff69b4",
        `${message.client.user} **takes a bite out of** ${message.author}`,
        (footer = {
          text: message.member.displayName,
          url: message.author.displaAvatarUrl,
        }),
        false,
        true,
        eating_gif
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
        var embed = G.GenerateEmbed(
          "#ff69b4",
          `${message.author} **eats** ${manualinput}`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displaAvatarUrl,
          }),
          false,
          true,
          eating_gif
        );
      } else {
        var embed = G.GenerateEmbed(
          "#ff69b4",
          `${message.author} **eats** ${message.mentions.members.first()}`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displaAvatarUrl,
          }),
          false,
          true,
          eating_gif
        );
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
