const { SlashCommandBuilder } = require("discord.js");
const wiki = require("wikipedia");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDefaultPermission(true)
    .setDescription("search wikipedia")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("wiki article you want to look up.")
        .setRequired(true)
    ),
  async execute(client, interaction, con) {
    await interaction.deferReply();
    const input = interaction.options.getString("search");
    const page = await wiki.page(input.replace(" ", "_"));
    const summary = await page.summary();
    return interaction.editReply({
      embeds: [
        G(
          "#0x8c8c8c",
          `wikipedia result for ${summary.displaytitle}`,
          false,
          [(fields = { name: summary.displaytitle, content: summary.extract })],
          false,
          false,
          summary.displaytitle,
          summary.content_urls.desktop.page
        ),
      ],
    });
  },
};
