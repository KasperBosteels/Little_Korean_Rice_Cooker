const score = require("../DataHandlers/socialCredit");
const wiki = require("wikipedia");
const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "wikipedia",
  description: "find a wikipedia article",
  cooldown: 1,
  usage: "<something you want to learn about>",
  category: "fun",
  aliases: ["wiki"],
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    if (!args[0])
      return message.reply(
        "Seems you forgot to tell me what i need to look up. :/"
      );
    let query = args.join(" ");
    try {
      const page = await wiki.page(query);
      const summary = await page.summary();
      let title = summary.displaytitle;
      let link = summary.content_urls.desktop.page;
      let text = summary.extract;
      message.channel.send({
        embeds: [
          G.GenerateEmbed(
            "#0x8c8c8c",
            `wikipedia result for ${title}`,
            message,
            [(fields = { name: title, content: text })],
            false,
            false,
            title,
            link
          ),
        ],
      });
    } catch (error) {
      console.log(error);
      message.channel.send(error);
    }
    score.ADD(con, 1, message.author.id);
  },
};
