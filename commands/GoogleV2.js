const G = require("../Generators/GenerateSimpleEmbed");
const imageSearch = require("image-search-google");
const paginationEmbed = require("discordjs-button-pagination");
const { ButtonBuilder } = require("discord.js");
const { pagination, TypesButtons, StylesButton } = require('@devraelfreeze/discordjs-pagination');
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
  perms: ["SendMessages", "ManageMessages", "EmbedLinks"],
  userperms: [],
  async execute(client, message, args, con) {
    //#region google search
    let Q = args.join(" ");
    var list = [];

    const button1 = new ButtonBuilder()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("Danger");
    const button2 = new ButtonBuilder()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("Success");
    let buttons = [button1, button2];
    try {
      await GoogleClient.search(Q, options).then((images) => {
        if (images.length == 0) {
          images.push({ url: "https://i.imgur.com/rA2dVik.png" });
        }
        for (let i = 0; i < images.length; i++) {
          list[i] = G.GenerateEmbed(
            "Random",
            false,
            false,
            false,
            false,
            images[i].url
          );
        }
      });
      await pagination({
        embeds:list,
        time:120000,
        fastSkip:false,
        disableButtons:true,
        author:message.author,
        message:message,
        buttons:[
          {
            value:TypesButtons.previous,
            label:"Previous",
            style: StylesButton.Danger,
            emoji:null,
          },
          {
            value:TypesButtons.next,
            label:"Next",
            style:StylesButton.Success,
            emoji:null
          },
        ]
      },)
//      paginationEmbed(message, list, buttons, time);
    } catch (error) {
      console.log(error);
    }
  },
};
