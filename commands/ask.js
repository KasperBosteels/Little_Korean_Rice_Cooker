const Discord = require("discord.js");
//#region answer array
var answers = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes - definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Pervert",
];
//#endregion
module.exports = {
  name: "ask",
  description: "ask a question",
  usage: "<question>",
  args: "true",
  category: "fun",
  execute(client, message, args) {
    //slice sentence and join them again with spaces for nice sentence
    sent = args.slice(0, args.length).join(" ");
    //get random from answers
    coin = Math.floor(Math.random() * Math.floor(answers.length));
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
