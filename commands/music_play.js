const score = require("../DataHandlers/socialCredit");
const stop = require("./music_stop");
const pause = require("./music_pause.js");
const {
  ChannelType
} = require("discord-api-types/v9");
module.exports = {
  name: "play",
  description: "To play some tunes in VC.",
  cooldown: 5,
  usage: "<name | url>",
  category: "music",
  aliases: ["p"],
  perms: ["SendMessages", "Connect", "Speak"],
  userperms: ["Connect"],
  async execute(client, message, args, con) {
    if (args.length < 1)
      return message.channel.send({
        content: "I can't play silence dude,give me something.",
      });
    let Vchannel, songquery, guildQueue;
    guildQueue = client.player.getQueue(message.guild.id);
    Vchannel = message.member.voice.channel;
    if (!Vchannel || !Vchannel.type === ChannelType.GuildVoice)
      return message.reply("You are not in a voice channel.");
    if (!args.length) {
      return await pause.execute(null, message, null, con);
    }

    songquery = args.join(" ");
    let queue = client.player.createQueue(message.guild.id, {
      data: { queueInitChannel: message.channel },
    });
    await queue.join(Vchannel);
    await queue
      .play(songquery, { requestedBy: message.author.username })
      .catch((_) => {
        if (!guildQueue) queue.stop();
      });
    return score.ADD(con, 3, message.author.id);
  },
};
