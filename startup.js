const time = 1 * 10 * 1000;
const statusTexts = ["-help", "beep beep boop", "your lovely voice"];
const statusType = ["WATCHING", "LISTENING", "LISTENING"];
const { CronJob } = require("cron");
const fs = require("node:fs");
const newsgetter = require("./newsgetter.js");
const news_channel = require("./DataHandlers/news_chhannel.js");
module.exports = {
  async execute(client, con) {
    try {
      if (!con.isInitialized) await con.initialize();
      con.initialize ? await con.synchronize() : console.log("\x1b[34m", "Not synchronizing with database.", "\x1b[0m")
    } catch (err) {
      console.log(err)
    }
    console.log(
      "\x1b[36m", `Logged in as ${client.user.tag} at: ${client.readyAt.toDateString()}`, "\x1b[0m"
    );
    let counter = 0;
    const setStatus = () => {
      client.user.setActivity(`${statusTexts[counter]}`, {
        type: statusType[counter],
      });
      if (++counter >= statusTexts.length) counter = 0;
      setTimeout(setStatus, time);
    };
    createLogCleaner();
    createNewsReported(client);
    setStatus();

  },

};
function createLogCleaner() {
  const Job = new CronJob("0 0 0 1/2 * * ", () => {
    try {
      const datum = new Date();
      const message = `REMOVED DATA PRIOR TO [${datum.toDateString()}]\n`;
      fs.writeFile("./info/log.txt", message, (error) => {
        if (error) throw console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  });
  Job.start();
}


function createNewsReported(client) {
  const job = new CronJob("0 0 1/1 * * * ", () => {
    try {
      const news = newsgetter.execute();
      const channels = news_channel.GET()

      channels.forEach(channel => {
        let randomNews = news[Math.floor(Math.random() * (news.length - 1))]
        let embed = newsgetter.makeEmbed(randomNews);
        newsgetter.postNewsEmbed(embed, client, channel)
      });
    }
    catch (error) {
      console.error(error);
    }
  });
  job.start();
}