const { GenerateEmbed } = require("../Generators/GenerateSimpleEmbed");
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
          embeds: [
            GenerateEmbed(
              "RANDOM",
              false,
              false,
              false,
              false,
              memefoto,
              memetitle,
              memeURL
            ),
          ],
        });
      })
      .catch("error", (err) => {
        console.log(err);
        return fallbackfunction(message);
      });
  },
};
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
        embeds: [
          GenerateEmbed(
            "RANDOM",
            false,
            false,
            false,
            false,
            memefoto,
            memetitle,
            memeURL
          ),
        ],
      });
    })
    .catch("error", (err) => {
      return console.log(err);
    });
}
