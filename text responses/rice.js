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
    }else if( tempstring.split(" ").length == 1 &&
    tempstring.split(" ")[0] == "woof"){
      reply("YIF!!, *zips the back of your furry suit open*")
    } else if (tempstring == "bot lies" || tempstring == "bot lie") {
      reply("I don't lie!");
      return;
    }else if (tempstring.split(" ")[0]==="steve")
    {
      reply("King Steve is the best and he will save us")
      return;
    
    } else {
      let swears = await getswearwords();
      await response(swears, tempstring).then((word) => {
        if (word != false) return reply(word);
      });
    }
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
