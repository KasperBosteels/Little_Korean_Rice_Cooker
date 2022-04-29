module.exports = {
  async writeAllPermissions(client) {
    console.log("updating application permissions...");
    try {
      let guilds = await Getguilds(client);
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
function Getguilds(client) {
  let presentGuilds = client.guilds.cache;
  for (let i = 0; i < presentGuilds.length; i++) {
    console.log(presentGuilds[i].id);
  }
  return presentGuilds;
}
