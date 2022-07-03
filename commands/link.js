const G = require("../Generators/GenerateSimpleEmbed").GenerateEmbed;
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
      content: "<:cooker:927889501295095879> ",
      embeds: [
        G(
          "#3ac941",
          "I will do my best for you.",
          false,
          false,
          false,
          false,
          false,
          "https://canary.discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376646&scope=applications.commands%20bot"
        ),
      ],
    });
    /*
    message.channel.send({
      content: `https://canary.discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376646&scope=applications.commands%20bot `,
    });
    */
  },
};
//latest https://canary.discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376646&scope=bot
