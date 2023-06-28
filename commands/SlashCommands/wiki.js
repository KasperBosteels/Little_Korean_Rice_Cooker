const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const wiki = require("wikipedia");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  name: "wiki",
  description: "Search Wikipedia",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],
  dmPermission: true,

  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "search",
      description: "Wikipedia Article you want to look up.",
    },
  ],

  async execute(client, interaction, con) {
    const {options} = interaction;
    const search = options.getString("search");
    const pageTitle = decodeURIComponent(search.replace(/_/g, " "));
    await interaction.deferReply();

    try {
      const page = await wiki.page(pageTitle);
      const summary = await page.summary();
      const title = summary.displaytitle.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags from title
      const extract = summary.extract.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags from extract
      const embed = G(
        "#00ff00",
        `Wikipedia result for ${title}`,
        false,
        [{ name: title, content: extract }],
        false,
        false,
        title,
        summary.content_urls.desktop.page
      );
      await interaction.followUp({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      await interaction.followUp("Something went wrong.");
    }
  },
};