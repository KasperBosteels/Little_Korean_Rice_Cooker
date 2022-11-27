const tickleDatabase = [
  "https://i.imgur.com/4LT8WJU.gif",
  "https://i.imgur.com/K1XmLDT.gif",
  "https://i.imgur.com/8GfodAL.gif",
  "https://i.imgur.com/VD8nvU5.gif",
  "https://i.imgur.com/DJth4Iz.gif",
  "https://i.imgur.com/bt2ZRjJ.gif",
  "https://i.imgur.com/4oiGtwW.gif",
  "https://i.imgur.com/nexl6h4.gif",
  "https://i.imgur.com/oUYCdNH.gif",
  "https://i.pinimg.com/originals/de/63/73/de6373193dc2b6622ec4178382a6a18b.gif",
  "https://i.imgur.com/yKzEEmA.gif",
];
const G = require("../Generators/GenerateSimpleEmbed");
const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "tickle",
  description: "Tickle me this, tickle me that.",
  cooldown: 1,
  usage: "<@user> / <blank> / <something you like>",
  category: "fun",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    try {
      score.ADD(con, 100, message.author.id);
    } catch (err) {
      console.error(err);
    } finally {
      return message.reply({
        embeds: [await createEmbed(message, tickleDatabase, args)],
      });
    }
  },
};
function createEmbed(message, tickleDatabase, args) {
  let coin = Math.floor(Math.random() * Math.floor(tickleDatabase.length));
  let msg = "";
  if (!message.mentions.members.first() && args.length == 0) {
    msg = `${message.client.user} [tickles you.](${tickleDatabase[coin]})`;
  } else if (args.length > 0 && !message.mentions.members.first()) {
    msg = `${message.author} [tickles](${tickleDatabase[coin]}) ${args.join(
      " "
    )}`;
  } else {
    msg = `${message.author} [tickles](${
      tickleDatabase[coin]
    }) ${message.mentions.members.first()}`;
  }
  let embed = G.GenerateEmbed(
    "#00ff00",
    msg,
    message,
    false,
    false,
    tickleDatabase[coin]
  );
  return embed;
}
