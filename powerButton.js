module.exports = {
  execute(message, con) {
    if (
      message.author.id != "258217948819357697" &&
      message.author.id != "256696952626872321"
    )
      return;
    if (message.content.includes("shutdown")) {
      message.channel
        .send({ content: "Pressing the power button..." })
        .then(() => {
          console.log({ content: "shutting down..." });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          con.end();
          process.exit();
        });
    }
  },
};
