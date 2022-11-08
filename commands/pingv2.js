const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "ping",
  description: "Gives you latency of the bot.",
  cooldown: 5,
  category: "config",
  usage: " ",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    //get current time and message recieved timestamp subtract and send back
    message.channel.send({ content: "ping..." }).then((sent) => {
      sent.edit({
        embeds: [
          G.GenerateEmbed(
            false,
            false,
            false,
            (fields = [
              {
                name: "*roundstrip latency*",
                content: `\`\`\` ${
                  sent.createdTimestamp - message.createdTimestamp
                } ms \`\`\``,
              },
              {
                name: "*websocket heartbeat:*",
                content: `\`\`\` ${client.ws.ping} ms \`\`\``,
              },
              {
                name: "*uptime:*",
                content: `\`\`\` ${uptimeGET(client)} \`\`\``,
              },
            ]),
            false,
            false,
            "**PING**"
          ),
        ],
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
