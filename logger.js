const { writeFile, fstat } = require("fs");
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
    const timeLog = `<${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}>`;
    let errorMessage = "";
    if (error != undefined) errorMessage = error.message;
    const LOG = `${"-".repeat(
      60
    )}\nTIME=${timeLog}\nCOMMAND= ${prefix}${commandName}\nARGUMENTS= ${args}\nID= [channel: ${channelID} guild: ${guildID}]\ntime-to-complete:${completionTime}ms\nerror: ${errorMessage}\n`;

    try {
      await writeFile("./info/log.txt", LOG, { flag: "a" }, (error) => {
        if (error) throw console.error(error);
      });
    } catch (err) {
      console.error(err);
    }
  },
};
