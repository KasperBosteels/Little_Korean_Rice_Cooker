module.exports = {
  execute(client, message, con) {
    if (message.author.id != "258217948819357697") return;
    if (message.content.includes("setcredit")) {
      let args = message.content;
      args = args.split(" ");
      let user = getUserFromMention(args[1], client);
      let userID = user.id;
      message.channel
        .send({ content: "changing credit..." })
        .then(() => {
          con.query(
            `UPDATE score set socialScore=${args[2]} WHERE userID="${userID}"`
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((err) => {
          if (err) {
            message.channel.send({ content: err.message });
          }
          message.channel.send({ content: "credit changed." });
          return console.log(
            `force changed ${userID} social credit to ${args[2]}`
          );
        });
    }
  },
};
function getUserFromMention(mention, client) {
  if (!mention) return;
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
    return client.users.cache.get(mention);
  }
}
