module.exports = {
  async execute(client) {
    const serverGuild = client.guilds.cache.get("927741496738869298");
    let commands;
    if (serverGuild) {
      commands = serverGuild.commands;
    } else {
      commands = client.application.commands;
    }
    commands.create({
      name: "ping",
      description: "The ping of the bot.",
    });
  },
};
