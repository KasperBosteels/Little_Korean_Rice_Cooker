const config = require("./auth.json");
module.exports = {
  async execute(client, con) {
    client.user.setActivity(`-${config.activity}`, { type: "WATCHING" });
    await con.connect();
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
