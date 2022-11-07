const G = require("../Generators/GenerateSimpleEmbed").GenerateEmbed;
const gif = require("../jsonFiles/bodily_affection.json");
const score = require("../DataHandlers/socialCredit");
const prefixGET = require("../DataHandlers/getprefixData").GET;
var chosen = " ";
var value = 0;
var users = [];
var lovemeter;
//loading bar in here for use of other commands possible
module.exports = {
  name: "matchmaker",
  description: "Find true love on discord (not a scam i swear).",
  cooldown: 3,
  usage: "<@user> or <@user> <@user> ",
  aliases: ["mm", "match"],
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    if (!args[0])
      return message.channel.send({
        content: `Give me a match\nif you dont know how to use this command try "${prefixGET(
          message.guild.id
        )}help matchmaker"`,
      });
    /**
     * Create a text progress bar
     * @param {Number} value - The value to fill the bar
     * @param {Number} maxValue - The max value of the bar
     * @param {Number} size - The bar size (in letters)
     * @return {String} - The bar
     */
    global.progressBar = (value, maxValue, size) => {
      const percentage = value / maxValue; // Calculate the percentage of the bar
      const progress = Math.round(size * percentage); // Calculate the number of square caracters to fill the progress side.
      const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

      const progressText = "❤".repeat(progress); // Repeat is creating a string with progress * caracters in it
      const emptyProgressText = "—".repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
      const percentageText = Math.round(percentage * 100) + "%"; // Displaying the percentage of the bar

      const bar =
        "```[" +
        progressText +
        emptyProgressText +
        "]" +
        percentageText +
        "```"; // Creating the bar
      return bar;
    };

    value = await Math.floor(Math.random() * 100 + 1);
    //#region ott's, afterhours and iced's request
    if (!args[1] && message.author == message.mentions.users.first()) {
      value = 0;
    }
    //#endregion

    if (args[0]) {
      let argument_length = args.length;
      for (let i = 0; i < argument_length; i++) {
        users[i] = getUserFromMention(client, args[i]);
      }
      if (users[1] && users[0] == users[1]) {
        value = 0;
      }
      let users_length = users.length;
      for (let o = 0; o < users_length; o++) {
        if (users[o].id == "284553236864827392") {
          if (value > 75) value = value / 2;
        }
      }
    }
    lovemeter = progressBar(value, 100, 25);
    if (!args[1]) {
      chosen = getGif(value);
      var embed = G(
        "#fc0fc0",
        `**LOVE O' METER**\n
	${message.author}  :heart:  ${users[0]}\n
	**measured love**\n${lovemeter}`,
        ((footer = {
          text: message.member.displayName,
          url: message.author.displayAvatarUrl,
        }),
        false,
        true,
        chosen,
        false)
      );
    } else {
      chosen = getGif(value);
      var embed = G(
        "#fc0fc0",
        `**LOVE O' METER**\n
			${users[0]}  :heart:  ${users[1]}\n
			**measured love**\n${lovemeter}`,
        (footer = {
          text: message.member.displayName,
          url: message.author.displaAvatarUrl,
        }),
        false,
        true,
        chosen,
        false
      );
    }
    message.channel.send({ embeds: [embed] });
    try {
      score.ADD(con, 100, message.author.id);
    } catch (err) {
      console.error(err);
    }
  },
};
function getUserFromMention(client, mention) {
  if (!mention) return;
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
    return client.users.cache.get(mention);
  }
}
function getGif(value) {
  var percent = value;
  if (percent < 2)
    return gif.zero[Math.floor(Math.random() * Math.floor(gif.zero.length))];
  if (percent <= 25 && percent > 2)
    return gif.lower[Math.floor(Math.random() * Math.floor(gif.lower.length))];
  if (percent <= 50 && percent > 25)
    return gif.low[Math.floor(Math.random() * Math.floor(gif.low.length))];
  if (percent <= 75 && percent > 50)
    return gif.med[Math.floor(Math.random() * Math.floor(gif.med.length))];
  if (percent < 100 && percent > 75)
    return gif.high[Math.floor(Math.random() * Math.floor(gif.high.length))];
  if (percent > 99)
    return gif.max[Math.floor(Math.random() * Math.floor(gif.max.length))];
}
