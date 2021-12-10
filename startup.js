const config = require("./auth.json");
const time = 1 * 10 * 1000;
const statusTexts = ["-help", "beep beep boop", "your lovely voice"];
const statusType = ["WATCHING", "LISTENING", "LISTENING"];

module.exports = {
  async execute(client, con) {
    await con.connect();
    console.log(`Logged in as ${client.user.tag}!`);
    let counter = 0;
    const setStatus = () => {
      let statustxt = statusTexts;
      client.user.setActivity(`${statusTexts[counter]}`, {
        type: statusType[counter],
      });
      if (++counter >= statusTexts.length) counter = 0;
      setTimeout(setStatus, time);
    };
    setStatus();
  },
};
