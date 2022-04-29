module.exports = {
  async writeAllPermissions(client) {
    console.log("updating application permissions...");
    try {
      let guilds = await Getguilds(client);
      guilds.forEach((g) => {
        g.commands.forEach((gc) => {
          gc.permissions.set(true);
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
function Getguilds(client) {
  let presentGuilds = client.guilds.cache.map(guild);
  return presentGuilds;
}
