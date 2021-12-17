const Discord = require("discord.js");
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
  async execute(client, message, args) {
    //slice sentence and join them again with spaces for nice sentence
    sent = args.slice(0, args.length).join(" ");
    //get random from answers
    coin = await Math.floor(Math.random() * Math.floor(answers.length));
    return message.channel.send({
      embeds: [makeEmbed(sent, answers[coin], message)],
    });
    //reply
    //message.channel.send(`${sent}\n ${answers[coin]}`);
  },
};
//make embed
function makeEmbed(question, answer, message) {
  const bed = new Discord.MessageEmbed()
    .setColor("#FFDF00")
    .setAuthor("Little_Korean_Rice_Cooker", "https://i.imgur.com/A2SSxSE.png")
    .setDescription(
      `question from ${message.member.displayName}\n"${question}"\n${answer}`
    );
  return bed;
}
