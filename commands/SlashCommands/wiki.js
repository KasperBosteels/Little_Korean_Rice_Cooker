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
