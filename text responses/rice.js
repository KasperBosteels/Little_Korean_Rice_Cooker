const fs = require("fs");
module.exports = {
  async execute(message) {
    let reply = async (words) => await message.channel.send({ content: words });
    let tempstring = message.content.toLowerCase();
    if (
      tempstring.split(" ").length == 1 &&
      tempstring.split(" ")[0] == "meow"
    ) {
      reply("pspspspspspspspsps, here kitty.");
      return;
    } else if (tempstring == "bot lies" || tempstring == "bot lie") {
      reply("I don't lie!");
      return;
    } else {
      let messageContent = await response(
        getswearwords(),
        tempstring.split(" ")
      );
      if (messageContent === false) {
        console.log(tempstring, messageContent);
        return;
      } else {
        reply(messageContent);
        return;
      }
    }
  },
};
function getswearwords() {
  return JSON.parse(fs.readFileSync("./jsonFiles/swearwords.json"));
}
async function response(swear, array) {
  let cache;
  for (let A = 0; A < array.length; A++) {
    cache = array[A].toLowerCase();
    swear["good"].map((word) => {
      if (cache.includes(word)) return "thank you (っ ᵔ ₃ ᵔ )っ🎔";
    });
    swear["rice"].map((word) => {
      if (cache.includes(word)) return "Here you go, :rice:";
    });
    swear["bad"].map((word) => {
      if (cache.includes(word)) return "Yeah, you're rubbing off on me.";
    });
  }
  return false;
}
