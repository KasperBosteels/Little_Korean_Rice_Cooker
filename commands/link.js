module.exports = {
  name: "invite-me",
  description: "Gives you a link to invite the bot to a different server.",
  cooldown: 1,
  usage: " ",
  category: "general",
  aliases: ["link", "invite"],
  perms: ["SEND_MESSAGES"],
  userperms: [],
  execute(client, message, args) {
    message.channel.send({
      content: `https://canary.discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376646&scope=bot%20applications.commands <:Cooker:910220565955104818>      `,
    });
  },
};
//latest https://canary.discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376646&scope=bot
