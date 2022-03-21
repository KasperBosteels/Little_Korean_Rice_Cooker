const { GET } = require("./getLogChannels");
module.exports = {
  async embedWithLog(member, embed, message) {
    let channelID = GET(member.guild.id);
    if (channelID != false) {
      console.log(channelID);
      let logchannel = member.guild.channels.cache.get(channelID);
      await logchannel.send({ embeds: [embed] });
    } else {
      if (message) await message.channel.send({ embeds: [embed] });
    }
  },
  async logWithNoMember(embed, message) {
    let channelID = GET(message.guild.id);
    if (channelID != false) {
      let logchannel = message.guild.channels.cache.get(channelID);
      await logchannel.send({ embeds: [embed] });
    } else {
      await message.channel.send({ embeds: [embed] });
    }
  },
  searchLogData(member) {
    let logchannel = GET(member.guild.id);
    if (logchannel != false) {
      return member.guild.channels.cache.get(logchannel);
    } else {
      return false;
    }
  },
};
