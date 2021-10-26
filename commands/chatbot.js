const score = require("../socalCredit");
const korean = require("korean-random-words");
module.exports = {
  name: "chat",
  description: "talk to me.",
  cooldown: 2,
  usage: " <something funny you want to tell me.>",
  category: "fun",
  alsiases: ["ch", "talk"],
  async execute(client, message, args, con, chatClient) {
    if (!args) return;
    score.ADD(con, 1, message.author.id);
    let reply = await chatClient.chat({
      message: args.join(" "),
      name: "Little Korean Rice Cooker",
      owner: "korean_rice_farmer",
      user: message.author.id,
      language: "auto",
    });

    if (reply.includes("https://acobot.ai/pricing")) {
      let phrasegen = new korean();
      let text = phrasegen.generatePhrase();
      text = text.split("").join(" ");
      return message.channel.send({ content: text });
    }
    return message.channel.send({ content: reply });
  },
};
