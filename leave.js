module.exports = {
  execute(message, client) {
    if (message.author.id != "258217948819357697") return;
    if (message.content.includes("*sayonara")) {
      message.channel
        .send({ content: "Sayonara" })
        .then(() => {
          message.guild.leave();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
};
