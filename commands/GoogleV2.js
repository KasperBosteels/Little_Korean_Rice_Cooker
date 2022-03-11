const { MessageEmbed } = require("discord.js");
const imageSearch = require("image-search-google");
const paginationEmbed = require("discordjs-button-pagination");
const { MessageButton } = require("discord.js");
const time = 60000;
const GoogleClient = new imageSearch(
  process.env.CSE_ID,
  process.env.GOOGLE_API_KEY
);
const options = { page: 1 };
module.exports = {
  name: "google",
  description: "Search google for images.",
  cooldown: 5,
  usage: "<your query>",
  category: "fun",
  aliases: ["img"],
  perms: ["SEND_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS"],
  userperms: [],
  async execute(client, message, args, con) {
    //#region google search
    let Q = args.join(" ");
    var list = [];

    const button1 = new MessageButton()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("DANGER");
    const button2 = new MessageButton()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("SUCCESS");
    let buttons = [button1, button2];
    try {
      await GoogleClient.search(Q, options).then((images) => {
        if (images.length == 0) {
          images.push({ url: "https://i.imgur.com/rA2dVik.png" });
        }
        for (let i = 0; i < images.length; i++) {
          list[i] = MakeEmbed(images[i].url, message.member, i, images.length);
        }
      });
      paginationEmbed(message, list, buttons, time);
    } catch (error) {
      console.log(error);
    }
  },
};

function MakeEmbed(url, member, i, l) {
  let embed = new MessageEmbed()
    .setImage(url)
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .setColor("RANDOM")
    .setFooter({ text: `page: ${i + 1}/${l}    Enhanced by Google` });
  return embed;
}
