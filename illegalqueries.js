const score = require("../socalCredit");
module.exports = {
  execute(client, message, args, con) {
    score.SUBTRACT(con, 200, message.author.id);
  },
};
