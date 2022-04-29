const Discord = require("discord.js");
import GenerateEmbed from "../Generators/GenerateSimpleEmbed";
//#region answer array
const answers = require("../jsonFiles/bodily_affection.json").answers;
//#endregion
module.exports = {
  name: "ask",
  description: "ask a question",
  usage: "<question>",
  cooldown: 1,
  args: "true",
  category: "fun",
  guildOnly: "false",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args) {
    //slice sentence and join them again with spaces for nice sentence
    question = args.slice(0, args.length).join(" ");
    //get random from answers
    coin = await Math.floor(Math.random() * Math.floor(answers.length));
    return message.channel.send({
      embeds: [
        GenerateEmbed(
          "#FFDF00",
          `Question from ${message.member.displayName}\n"${question}"\n${answers[coin]}`
        ),
      ],
    });
  },
};
