const score = require("../socalCredit");
const { GenerateEmbed } = require("../Generators/GenerateSimpleEmbed");
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
    let embed = GenerateEmbed(
      "RANDOm",
      "the current colume is " + `${volume}%\n`,
      {
        text: message.member.displayName,
        iconURL: message.author.displayAvatarUrl,
      },
      [
        {
          text: `${i++}. **${song.name}** by: ${song.author}\n duration: ${
            song.duration
          }\n requested by: ${song.requestedBy}`,
        },
      ],
      false,
      false,
      "QUEUE"
    );

    console.log(guildQueue);
    message.channel.send({ embeds: [embed] });
    score.ADD(con, 1, message.author.id);
  },
};
