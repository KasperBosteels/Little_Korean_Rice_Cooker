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
    let guildQueue = client.player.getQueue(message.guild.id);
    let volume = guildQueue.volume;
    let embed = new Discord.MessageEmbed()
      .setTitle("QUEUE")
      .setDescription("the current volume is: " + `${volume}/100\n`)
      .setColor("RANDOM")
      .setAuthor({
        name: "Little_Korean_Rice_Cooker",
        url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
        iconURL: "https://i.imgur.com/A2SSxSE.png",
      })
      .setFooter({
        text: message.member.displayName,
        iconURL: message.author.displayAvatarUrl,
      });

    let i = 0;
    guildQueue.songs.forEach((song) => {
      embed.addField(
        `${i++}. **` + song.name + "**",
        `by: ${song.author}\nduration: ${song.duration}\nrequested by:${song.requestedBy}`
      );
    });
    console.log(guildQueue);
    message.channel.send({ embeds: [embed] });
    score.ADD(con, 1, message.author.id);
  },
};
