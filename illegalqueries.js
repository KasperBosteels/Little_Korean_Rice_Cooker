const score = require("./DataHandlers/socialCredit");
module.exports = {
  execute(client, message, args, con) {
    score.SUBTRACT(con, 200, message.author.id);
  },
};
