const search = require("yt-search");
const { MessageEmbed } = require("discord.js");
const social = require("../socalCredit");
module.exports = {
  name: "youtube",
  description: "I will look for some good videos.",
  cooldown: 2,
  usage: "<title>",
  aliases: ["yt"],
  category: "fun",
  async execute(client, message, args, con, options) {
    message.deferReply();
    if (!args[0])
      return message.editReply({
        content:
          "<:whot:800083736682823711> you gotta give me a clue at least.",
      });
    await search(args.join(" "), function (err, result) {
      if (err) {
        console.log(err);
        return message.editReply({
          content:
            "Something went badly. error: 7 <:sadgeCooker:910210761136148581>          ",
        });
      }
      let videos = result.videos.slice(0, 5);
      message.editReply(videos[0].url);
    });
    social.ADD(con, 1, message.author.id);
  },
};
