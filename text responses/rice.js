const fs = require("fs");
module.exports = {
  async execute(message) {
    let reply = async (words) => await message.channel.send({ content: words });
    let tempstring = message.content.toLowerCase();
    if (array.length == 1 && array[0].toLowerCase() == "meow") {
      return reply("pspspspspspspspsps, here kitty.");
    } else if (tempstring == "bot lies" || tempstring == "bot lie") {
      return reply("I don't lie!");
    } else {
      const messageArray = message.content.split().toLowerCase();
      const swear = await getswearwords();
      let messageContent = response(swear, messageArray);
      if (messageContent != false) return reply(messageContent);
    }
  },
};
function getswearwords() {
  return JSON.parse(fs.readFileSync("./jsonFiles/swearwords.json"));
}
function response(swear, array) {
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
