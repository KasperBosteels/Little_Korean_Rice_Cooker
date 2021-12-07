const music = require("@koenie06/discord.js-music");
const score = require("../socalCredit");
const Discord = require("discord.js");
module.exports = {
  name: "queue",
  description: "look at the queue'd songs",
  cooldown: 1,
  usage: " ",
  category: "music",
  async execute(client, message, args, con) {
    let list = await music.getQueue({ interaction: message });
    console.log(list);
    let embed = new Discord.MessageEmbed()
      .setTitle("QUEUE")
      .setDescription("The queue for this PARTAY!")
      .setColor("RANDOM");
    for (let i = 0; i < list.length; i++) {
      embed.addField(
        `${list[i].info.title}`,
        `duration: ${list[i].info.duration}  author: ${list[i].info.author} requested by:${list[i].requester}`
      );
    }
    message.channel.send({ embeds: [embed] });
    score.ADD(con, 1, message.author.id);
  },
};
