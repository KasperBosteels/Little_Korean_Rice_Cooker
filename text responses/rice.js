const fs = require("fs");
module.exports = {
  async execute(message) {
    let reply = async (words) => await message.channel.send({ content: words });
    let tempstring = message.content.toLowerCase();
    const temp =tempstring.split(" ");
    switch(temp){
      case temp[0] == "meow":
        return reply("pspspspspspspspsps, here kitty.");
        case tempstring.split(" ")[0] == "woof":
        return reply("YIF!!, *zips the back of your furry suit open*");
        case temp.join(" ") == "bot lies" || "bot lie":
        return reply("I don't lie!");
        case temp[0] === "steve":
        return reply("King Steve is the best and he will save us");
    }
      let swears = await getswearwords();
      await response(swears, tempstring).then((word) => {
        if (word != false) return reply(word);
      });
  },
};
function getswearwords() {
  return JSON.parse(fs.readFileSync("./jsonFiles/swearwords.json"));
}
async function response(swear, input) {
  let returnValue = false;
  swear["good"].forEach((word) => {
    if (input.includes(word)) returnValue = "thank you (っ ᵔ ₃ ᵔ )っ🎔";
  });
  if (returnValue === false) {
    swear["rice"].forEach((word) => {
      if (input.includes(word)) returnValue = "Here you go, :rice:";
    });
  }
  if (returnValue === false) {
    swear["bad"].forEach((word) => {
      if (input.includes(word)) returnValue = "Yeah, you're rubbing off on me.";
    });
  }
  return returnValue;
}
