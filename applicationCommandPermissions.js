module.exports = {
  async writeAllPermissions(client) {
    console.log("updating application permissions...");
    try {
      let guilds = await client.guilds.cache;
      guilds.forEach((g) => {
        let guildcommands = g.commands;
        guildcommands.forEach((gc) => {
          gc.permissions.set(true);
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
