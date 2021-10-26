const score = require("../socalCredit");
const chatbot = require("smartestchatbot");
module.exports = {
  name: "chat",
  description: "talk to me.",
  cooldown: 1,
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
    message.channel.send({ content: reply });
  },
};
