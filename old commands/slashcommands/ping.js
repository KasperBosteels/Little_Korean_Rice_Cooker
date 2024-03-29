const discord = require("discord.js");
const { ApplicationCommandType } = require("discord-api-types/v9");
module.exports = {
  name: "ping",
  description: "ping pong ping",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],
  async execute(client, interaction, con) {
    await interaction.deferReply();
    await interaction.editreply({
      content: " ",
      embeds: [makeEmbed(client.ws.ping, uptimeGET(client))],
      ephemeral: true,
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
function makeEmbed(heartbeat, uptime) {
  let embed = new discord.MessageEmbed()
    .setTitle("**PING**")
    .addField("*ping:*", `\`\`\` ${heartbeat} ms \`\`\``)
    .addField("*uptime:*", `\`\`\` ${uptime} \`\`\``)
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    });
  return embed;
}
