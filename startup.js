const time = 1 * 10 * 1000;
const statusTexts = ["-help", "beep beep boop", "your lovely voice"];
const statusType = ["WATCHING", "LISTENING", "LISTENING"];
const { CronJob } = require("cron");
const fs = require("node:fs");
const newsgetter = require("./newsgetter.js");
const news_channel = require("./DataHandlers/news_chhannel.js");
const llama = require("./DataHandlers/llamaMessageHistory.js");
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
  async SufferFromAmnesia(con) {
    if (!con.isInitialized) await con.initialize();
    const Job = new CronJob("0 0 * 1/2 * * ", async () => {  // Ze '*/1' means every minute
      let dateToCheck = new Date();
      dateToCheck.setDate(dateToCheck.getDate() - 2);
      try {
        let allData = llama.GETALL();
        const chatRepository = await con.manager.getRepository("Chats");
        for (let i = 0; i < allData.length; i++) {
          if (allData[i].Messages.length > 0 || allData[i].lastChanged < dateToCheck) {
            let d = allData[i];
            const user = await con.manager.findOneBy("Users", { user_id: d.userID });
            const guild = await con.manager.findOneBy("Guilds", { guild_id: d.guildID });
            let c = chatRepository.create({
              guild: guild,
              member: user,
              last_changed: d.lastChanged,
              message_history: JSON.stringify(d.Messages)
            });
            await chatRepository.save(c);
            allData[i].Messages = [];
          }
        }
        llama.REFRESH([]);
      } catch (error) {
        console.error(error);
      }
    });
    Job.start();
  },
};
function createLogCleaner() {
  const Job = new CronJob("0 0 * 1/2 * * ", () => {
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


async function createNewsReported(client) {
  const job = new CronJob("0 0 1/1 * * * ", async () => {
    try {
      const news = await newsgetter.execute();
      const channels = await news_channel.GET()

      channels.forEach(async channel => {
        let randomNews = news[Math.floor(Math.random() * (news.length - 1))];
        try {
          await newsgetter.postNewsEmbed(newsgetter.makeEmbed(randomNews), client, channel);
        } catch (error) {
          console.error(error);
        }
      });
    }
    catch (error) {
      console.error(error);
    }
  });
  job.start();
}

