const fs = require("fs");
const channel_alert = require("./profanity_alert_data_collector");
const profanity_enabled = require("./profanity_enabled");
const score = require("./socalCredit");
const Discord = require("discord.js");
const threats = [
  "Profanity detected!",
  "I have detected profanity in your message, i will report this.",
  "You have activated my trap card and allowed me to report your profanity.",
  "Your messages contained unnaceptable words and was deleted.",
  "Profanity like this is not allowed, your message was deleted.",
  "No bad words allowed here.",
  "Maybe take a breather before sending any more messages like that.",
  "I cannot allow that kind of language.",
  "Calm down that language please.",
];
module.exports = {
  execute(message, client, con) {
    proffilter(message, client, con);
  },
};
function proffilter(message, client, con) {
  //check if this guild is being filtered
  if (!profanity_enabled.GET(message.guild.id)) return;

  //split content of message and get list of swear words
  let messageArray = message.content.split();
  let swear = getswearwords();
  let sentecUser = "";
  let amountswear = 0;

  //for every word in message check if it is in the swearwords list
  for (let Y = 0; Y < messageArray.length; Y++) {
    const word = messageArray[Y].toLowerCase();

    var changeword = "";

    for (let i = 0; i < swear["vloekwoorden"].length; i++) {
      //#region replace word with ***** disabled for now
      if (word.includes(swear["vloekwoorden"][i])) {
        changeword = word.replace(swear["vloekwoorden"][i], "******");
        sentecUser += " " + changeword;
        amountswear++;
      }
    }
    //glue message togheter again
    if (!changeword) {
      sentecUser += " " + messageArray[Y];
    }
    //#endregion
    //if there are more than 0 swear words found be annoying
    if (amountswear != 0) {
      try {
        let coin = Math.floor(Math.random() * Math.floor(threats.length));
        sendMessageToChannel(message, client);
        //message.channel.send(sentecUser);
        message.channel.send({
          content: message.author + `\n${threats[coin]}`,
        });
      } catch (err) {
        return console.log(err);
      } finally {
        console.log(
          `profanity  ${message.author.tag}   \"${message.content}\"`
        );

        message.delete();
        score.SUBTRACT(con, 300, message.author.id);
      }
    }
  }
  //check if any of the characters are arabic if true replace with chiken soup
  /*
    if(HasArabicCharacters(message)){
        message.delete();
        message.channel.send("chiken soup !");
    };
    */
}
//get swear words from json file
function getswearwords() {
  return JSON.parse(fs.readFileSync("./jsonFiles/swearwords.json"));
}
//check for arabic
function HasArabicCharacters(text) {
  var arregex = /[\u0600-\u06FF]/;
  return arregex.test(text);
}
function sendMessageToChannel(message, client) {
  let alertChannel = channel_alert.GET(message.guild.id);
  if (alertChannel != false) {
    client.channels
      .fetch(alertChannel)
      .then((channel) => {
        return channel.send({ embeds: [makeEmbed(message)] });
      })
      .catch(console.error);
  } else {
    return;
  }
}
function makeEmbed(message) {
  let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setFooter(message.member.displayName)
    .setTimestamp().setDescription(`**this user has used profanity**\n
location: ${message.channel.name}\n
content: "${message.content}"`);
  return embed;
}
