module.exports = {
  execute(message) {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (!message.channel.name) {
      console.log(
        `${message}           DM           DM\n${message.author.tag}      ${time}\n`
      );
    } else {
      console.log(
        `${message}           ${message.channel.name}           ${message.guild.name}\n${message.author.tag}      ${time}\n`
      );
    }
  },
};
