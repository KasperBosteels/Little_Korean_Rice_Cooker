const discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "meme",
  description: "Cripsy memes.",
  cooldown: 3,
  usage: " ",
  category: "fun",
  perms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    await fetch(getRandom())
      .then((resp) => resp.json())
      .then((responsomgv) => {
        let permalink = responsomgv[0].data.children[0].data.permalink;
        let memeURL = `https://www.reddit.com${permalink}`;
        let memetitle = responsomgv[0].data.children[0].data.title;
        let memefoto = responsomgv[0].data.children[0].data.url;
        return message.channel.send({
          embeds: [makeEmbed(memefoto, memetitle, memeURL)],
        });
      })
      .catch("error", (err) => {
        console.log(err);
        return fallbackfunction(message);
      });
  },
};
function makeEmbed(foto, title, url) {
  let embed = new discord.MessageEmbed()
    .setTitle(title)
    .setURL(url)
    .setImage(foto)
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .setColor("RANDOM");
  return embed;
}
function getRandom() {
  let sources = [
    "https://www.reddit.com/r/memes/random/.json",
    "https://www.reddit.com/r/surrealmemes/random/.json",
    "https://www.reddit.com/r/dankmemes/random/.json",
  ];
  let coin = Math.floor(Math.random() * sources.length);
  return sources[coin];
}
async function fallbackfunction(message) {
  fetch(await getRandom())
    .then((resp) => resp.json())
    .then((responsomgv) => {
      let permalink = responsomgv[0].data.children[0].data.permalink;
      let memeURL = `https://www.reddit.com${permalink}`;
      let memetitle = responsomgv[0].data.children[0].data.title;
      let memefoto = responsomgv[0].data.children[0].data.url;
      return message.channel.send({
        embeds: [makeEmbed(memefoto, memetitle, memeURL)],
      });
    })
    .catch("error", (err) => {
      return console.log(err);
    });
}
