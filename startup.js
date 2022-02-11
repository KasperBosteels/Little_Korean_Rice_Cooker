const time = 1 * 10 * 1000;
const statusTexts = ["-help", "beep beep boop", "your lovely voice"];
const statusType = ["WATCHING", "LISTENING", "LISTENING"];
const { CronJob } = require("cron");
const fs = require("fs");
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
    createLogCleaner();
    setStatus();
  },
};
function createLogCleaner() {
  const Job = new CronJob("0 0 0 1/2 * * ", () => {
    try {
      const datum = new Date();
      const message = `REMOVED DATA PRIOR TO [${datum.toDateString()}]`;
      fs.writeFile("./info/log.txt", message, (error) => {
        if (error) throw console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  });
  Job.start();
}
