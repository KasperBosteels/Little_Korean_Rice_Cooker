const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping pong ping"),
  async execute(client, interaction) {
    await interaction.reply({
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
    .addField("*uptime:*", `\`\`\` ${uptime} \`\`\``);
  return embed;
}
