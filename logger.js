const { writeFile } = require("node:fs");
module.exports = {
  async execute(
    prefix,
    commandName,
    args,
    error = undefined,
    channelID,
    guildID,
    completionTime
  ) {
    const time = new Date();
    const timeLog = `${time.toString()}`;
    let errorMessage = "";
    if (error != undefined) errorMessage = error.message;
    const LOG = `${"-".repeat(
      60
    )}\nTIME= ${timeLog}\nCOMMAND= ${prefix}${commandName}\nARGUMENTS= ${args}\nID= [channel: ${channelID} guild: ${guildID}]\ntime-to-complete:${completionTime}ms\nerror: ${errorMessage}\n`;

    try {
      await writeFile("./info/log.txt", LOG, { flag: "a" }, (error) => {
        if (error) throw console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  },
  async LEAVE_JOINLOG(error = undefined, guildID, event) {
    let LOG;
    if (error) {
      LOG = `${"+".repeat(30)}USER EVENT${"+".repeat(
        30
      )}\n${event}\nguild: ${guildID}\nerror: ${error}\n`;
    } else {
      LOG = `${"+".repeat(30)}USER EVENT${"+".repeat(
        30
      )}\n${event}\nguild: ${guildID}\n`;
    }
    try {
      await writeFile("./info/log.txt", LOG, { flag: "a" }, (error) => {
        if (error) throw console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  },
  async profanity(channelID, guildID, Content) {
    const time = new Date();
    const timeLog = `${time.toString()}`;
    let LOG;
    LOG = `${"#".repeat(31)}PROFANITY${"#".repeat(
      30
    )}\nguild: ${guildID}\nchannel: ${channelID}\ntime: ${timeLog}\ncontent: ${Content}`;
    try {
      await writeFile("./info/log.txt", LOG, { flag: "a" }, (error) => {
        if (error) throw console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
