const discord = require("discord.js");
module.exports = {
  name: "ping",
  description: "Gives you latency of the bot.",
  cooldown: 5,
  category: "config",
  usage: " ",
  async execute(client, message, args, con) {
    //get current time and message recieved timestamp subtract and send back
    message.channel.send({ content: "ping..." }).then((sent) => {
      sent.edit({
        embeds: [
          makeEmbed(
            sent.createdTimestamp - message.createdTimestamp,
            client.ws.ping,
            uptimeGET(client)
          ),
        ],
      });
      //sent.edit(`roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp} ms \n websocket heartbeat: ${client.ws.ping} ms\n${uptimeGET(client)}`);
    });
    return;
  },
};
function uptimeGET(client) {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let totalminutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  return `${days}:${hours}:${totalminutes}:${seconds}`;
}
function makeEmbed(roundtrip, heartbeat, uptime) {
  let embed = new discord.MessageEmbed()
    .setTitle("**PING**")
    .addField("*roundtrip latency:*", `\`\`\` ${roundtrip} ms \`\`\``)
    .addField("*websocket heartbeat:*", `\`\`\` ${heartbeat} ms \`\`\``)
    .addField("*uptime:*", `\`\`\` ${uptime} \`\`\``);
  return embed;
}
