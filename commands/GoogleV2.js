const G = require("../Generators/GenerateSimpleEmbed");
const imageSearch = require("image-search-google");
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
    try {
      const Q = args.join(" ");
      const images = await searchGoogle(Q);
      const list = images.map((image) =>
        G.GenerateEmbed("Random", false, false, false, false, image.url)
      );
      const feedbackMessage = await message.channel.send('Searching for images...');

      await pagination({
        embeds: list,
        time: time,
        fastSkip: false,
        disableButtons: true,
        author: message.author,
        message: feedbackMessage,
        buttons: [
          {
            value: TypesButtons.previous,
            label: "Previous",
            style: StylesButton.Danger,
            emoji: null,
          },
          {
            value: TypesButtons.next,
            label: "Next",
            style: StylesButton.Success,
            emoji: null,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      message.channel.send("An error occurred while searching for images.");
    }
  },
};

async function searchGoogle(query) {
  try {
    const images = await GoogleClient.search(query, options);
    return images.length === 0
      ? [{ url: "https://i.imgur.com/rA2dVik.png" }]
      : images;
  } catch (error) {
    console.log(error);
    return [{ url: "https://i.imgur.com/rA2dVik.png" }];
  }
}
