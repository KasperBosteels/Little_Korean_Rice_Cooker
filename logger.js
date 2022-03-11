const { writeFile } = require("fs");
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
      LOG = `${"+".repeat(60)}\n${event}\nguild: ${guildID}\nerror: ${error}`;
    } else {
      LOG = `${"+".repeat(60)}\n${event}\nguild: ${guildID}`;
    }
    try {
      await writeFile("./info/log.txt", LOG, { flag: "a" }, (error) => {
        if (error) throw console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
