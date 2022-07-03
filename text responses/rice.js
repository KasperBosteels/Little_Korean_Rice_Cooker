const fs = require("fs");
module.exports = {
  async execute(message) {
    let reply = async (words) => await message.channel.send({ content: words });
    const swear = await getswearwords();
    const messageArray = message.content.split().toLowerCase();
    let messageContent = response(swear, messageArray);
    if (messageContent != false) return reply(messageContent);
  },
};
function getswearwords() {
  return JSON.parse(fs.readFileSync("./jsonFiles/swearwords.json"));
}
function response(swear, array) {
  if (array.length == 1 && array[0].toLowerCase() == "meow")
    return "pspspspspspspspsps, here kity.";
  for (let A = 0; A < array.length; A++) {
    const userWord = array[A].toLowerCase();
    swear["good"].map((word) => {
      if (userWord.includes(word)) return "thank you (っ ᵔ ₃ ᵔ )っ🎔";
    });
    swear["rice"].map((word) => {
      if (userWord.includes(word)) return "Here you go, :rice:";
    });
    swear["bad"].map((word) => {
      if (userWord.includes(word)) return "Yeah, you're rubbing off on me.";
    });
  }
  return false;
}
