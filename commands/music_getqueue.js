const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
const Discord = require("discord.js");
module.exports = {
  name: "queue",
  description: "look at the queue'd songs",
  cooldown: 1,
  usage: " ",
  category: "music",
  perms: ["SEND_MESSAGES"],
  userperms: ["CONNECT"],
  async execute(client, message, args, con) {
    let list = await music.getQueue({ interaction: message });
    let embed = new Discord.MessageEmbed()
      .setTitle("QUEUE")
      .setDescription("The queue for this PARTAY!")
      .setColor("RANDOM")
      .setAuthor({
        name: "Little_Korean_Rice_Cooker",
        url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
        iconURL: "https://i.imgur.com/A2SSxSE.png",
      })
      .setFooter({
        text: message.member.displayName,
        iconURL: message.author.displaAvatarUrl,
      });
    for (let i = 0; i < list.length; i++) {
      embed.addField(
        `[${i + 1}]${list[i].info.title}`,
        `duration: ${list[i].info.duration}  author: ${list[i].info.author} requested by:${list[i].requester}`
      );
    }
    message.channel.send({ embeds: [embed] });
    score.ADD(con, 1, message.author.id);
  },
};
