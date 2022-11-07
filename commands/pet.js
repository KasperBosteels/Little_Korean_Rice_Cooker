const G = require("../Generators/GenerateSimpleEmbed");
const pats = require("../jsonFiles/bodily_affection.json").pats;
const score = require("../DataHandlers/socialCredit");
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
    if (!args[0]) {
      var embed = G.GenerateEmbed(
        "#ff69b4",
        `${message.client.user} **forcefully pets** ${message.author}`,
        (footer = {
          text: message.member.displayName,
          url: message.author.displayAvatarUrl,
        }),
        false,
        false,
        pats_gif
      );
    } else {
      var member = message.mentions.members.first();

      if (!member) {
        let argument_length = args.length;
        for (let i = 0; i < argument_length; i++) {
          if (args[i] == undefined) {
          } else {
            manualinput += ` ${args[i]}`;
          }
        }
        var embed = G.GenerateEmbed(
          "#ff69b4",
          `${message.author} **pets** ${manualinput}`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displayAvatarUrl,
          }),
          false,
          false,
          pats_gif
        );
      } else {
        var embed = G.GenerateEmbed(
          "#ff69b4",
          `${message.author} **pets** ${message.mentions.members.first()}`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displayAvatarUrl,
          }),
          false,
          false,
          pats_gif
        );
      }
    }
    await message.channel.send({ embeds: [embed] });
    try {
      score.ADD(con, 50, message.author.id);
    } catch (err) {
      console.error(err);
    }
  },
};
