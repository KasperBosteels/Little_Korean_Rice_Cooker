const { GET } = require("./getLogChannels");
const welcome_channel = require("./welcome_data");
module.exports = {
  async embedWithLog(member, embed, message) {
    let channelID = GET(member.guild.id);
    if (channelID != false) {
      let logchannel = await member.guild.channels.cache.get(channelID);
      if (!logchannel) return;
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
  async log_new_user(member, embed, guildID, client) {
    let WelcomeChannel = await welcome_channel.GET(guildID);
    if (WelcomeChannel != false || WelcomeChannel == null) {
      let welcome_channel = await client.channels.cache.get(WelcomeChannel);
      await welcome_channel.send({ embeds: [embed] });
    } else {
      await this.embedWithLog(member, embed, false);
    }
  },
};
