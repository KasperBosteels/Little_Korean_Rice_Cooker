const { SlashCommandBuilder } = require("@discordjs/builders");
const google = require("../../commands/GoogleV2");
const imageSearch = require("image-search-google");
const googleClient = new imageSearch(
  process.env.CSE_ID,
  process.env.GOOGLE_API_KEY
);
const {
  MessageButton,
  CommandInteraction,
  Interaction,
} = require("discord.js");
import { Pagination, PaginationResolver } from "@discordx/pagination";
const options = { page: 1 };
module.exports = {
  data: new SlashCommandBuilder()
    .setName("google")
    .setDescription("Look images up on google.")
    .addStringOption((option) =>
      option.setName("google").setDescription("Something you want to look up.")
    ),
  async execute(client, interaction, con) {
    interaction.deferReply();
    let Q = interaction.options.getString("google");
    let list = [];
    try {
      await googleClient.search(Q, options).then((images) => {
        if (images.length == 0) {
          images.push({ url: "https://i.imgur.com/rA2dVik.png" });
        }
        for (let i = 0; i < images.length; i++) {
          list[i] = MakeEmbed(
            images[i].url,
            Interaction.member,
            i,
            images.length
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};

function MakeEmbed(url, member, i, l) {
  let embed = new MessageEmbed()
    .setImage(url)
    .setAuthor(
      member.displayName,
      member.user.displayAvatarURL({ dynamic: true, size: 4096 })
    )
    .setColor("#00ff00")
    .setFooter(`page: ${i + 1}/${l}    Enhanced by Google`);
  return embed;
}
