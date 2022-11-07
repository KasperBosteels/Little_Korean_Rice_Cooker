const channel_alert = require("./DataHandlers/profanity_alert_data_collector");
const profanity_enabled = require("./DataHandlers/profanity_enabled");
const score = require("./DataHandlers/socialCredit");
const warn = require("./commands/warnv2");
const {
  get_default_swear_words,
  GET,
} = require("./DataHandlers/update_swear_words");
const { profanity } = require("./logger");
const G = require("./Generators/GenerateSimpleEmbed").GenerateEmbed;
const threats = [
  "Profanity detected! <:angryCooker:910235812334022746>  ",
  "I have detected profanity in your message, i will report this. <:angryCooker:910235812334022746>  ",
  "You have activated my trap card and allowed me to report your profanity.",
  "Your messages contained unnaceptable words and was deleted. <:angryCooker:910235812334022746>  ",
  "Profanity like this is not allowed, your message was deleted. <:angryCooker:910235812334022746>  ",
  "No bad words allowed here. <:angryCooker:910235812334022746>  ",
  "Maybe take a breather before sending any more messages like that.",
  "I cannot allow that kind of language.",
  "Calm down that language please.",
];
module.exports = {
  execute(message, client, con) {
    proffilter(message, client, con);
  },
};
async function proffilter(message, client, con) {
  //check if this guild is being filtered
  if (!profanity_enabled.GET(message.guild.id)) return;

  //split content of message and get list of swear words
  let messageArray = message.content.split();
  let swear = await getswearwords(message.guild.id);
  let amountswear = 0;
  let userID = message.author.id;
  //for every word in message check if it is in the swearwords list
  const messageLength = messageArray.length;
  for (let Y = 0; Y < messageLength; Y++) {
    for (let i = 0; i < swear.length; i++) {
      if (messageArray[Y].toLowerCase().includes(swear[i])) {
        amountswear++;
      }
    }
    //#endregion
    //if there are more than 0 swear words found be annoying
    if (amountswear != 0) {
      try {
        let coin = Math.floor(Math.random() * Math.floor(threats.length));
        sendMessageToChannel(message, client);
        //message.channel.send(sentecUser);
        message.channel.send({
          content: `${message.author}` + `\n${threats[coin]}`,
        });
      } catch (err) {
        return console.log(err);
      } finally {
        profanity(message.channel.id, message.guild.id, message.content);
        score.SUBTRACT(con, 125, message.author.id);
        if ((await score.GETSCORE(con, userID)) <= 500) {
          warn.aleternateWarn(
            con,
            message.guild.id,
            message.author.id,
            "automatic profanity warning",
            message.member.displayName
          );
        }
        await message.delete();
      }
    }
  }
}
//get swear words from json file
async function getswearwords(guildID) {
  let customs = await GET(guildID);
  let allswearwords = [];
  allswearwords = await get_default_swear_words();
  if (customs.default == 1) {
    allswearwords.push(...customs.custom);
  } else {
    allswearwords = customs.custom;
  }
  return allswearwords;
}
function sendMessageToChannel(message, client) {
  let alertChannel = channel_alert.GET(message.guild.id);
  if (alertChannel != false) {
    client.channels
      .fetch(alertChannel)
      .then((channel) => {
        return channel.send({
          embeds: [
            G(
              "#ff0000",
              `**this user has used profanity**
              \nlocation: ${message.channel.name}
              \ncontent: "${message.content}"`,
              (footer = {
                text: message.member.displayName,
                iconURL: message.member.iconURL,
              }),
              false,
              true,
              false,
              false,
              message.link
            ),
          ],
        });
      })
      .catch(console.error);
  } else {
    return;
  }
}
