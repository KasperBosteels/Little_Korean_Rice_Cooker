const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "ping",
  description: "Gives you latency of the bot.",
  cooldown: 5,
  category: "config",
  usage: " ",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    //get current time and message recieved timestamp subtract and send back
    message.channel.send({ content: "ping..." }).then((send) => {
      const embed = G.GenerateEmbed(
        false,
        false,
        false,
        (fields = [
          {
            name: "*roundstrip latency*",
            value: `\`\`\` ${
              send.createdTimestamp - message.createdTimestamp
            } ms \`\`\``,
          },
          {
            name: "*websocket heartbeat:*",
            value: `\`\`\` ${client.ws.ping} ms \`\`\``,
          },
          {
            name: "*uptime:*",
            value: `\`\`\` ${uptimeGET(client)} \`\`\``,
          },
        ]),
        false,
        false,
        "**PING**"
      );
      send.edit({
        embeds: [embed],
      });
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
