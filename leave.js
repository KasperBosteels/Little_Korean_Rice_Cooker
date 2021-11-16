module.exports = {
  execute(message, client) {
    if (message.author.id != "258217948819357697") return;
    if (message.content.includes("*leave")) {
      message.channel
        .send({ content: "Sayonara" })
        .then(() => {
          console.log(
            `leaving server: ${message.guild} <:sadgeCooker:910210761136148581>          `
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          message.guild.leave();
        });
    }
  },
};
