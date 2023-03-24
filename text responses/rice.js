const fs = require("fs");
module.exports = {
  async execute(message) {
    let tempstring = message.content.toLowerCase();
    const temp =tempstring.split(" ");
    switch(temp[0]){
      case "meow":
        await message.channel.send({ content:"pspspspspspspspsps, here kitty."})
        return;
        case "woof":
          await message.channel.send({ content:"YIF!!, *zips the back of your furry suit open*"})
        return;
    }
      let swears = await getswearwords();
      await response(swears, tempstring).then(async (word) => {
        if (word != false) return await message.channel.send({ content:word});
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
