const ignoreusers = require("../DataHandlers/ignored_users");
module.exports = {
  name: "ignore-me",
  description: "I will remove all you data, and ignore you.",
  cooldown: 1,
  usage: " ",
  category: "config",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    let id = message.author.id;
    let data_removed_string = " ";
    if (!id) return console.log("no ID found from message.");
    await con.query(`DELETE FROM levels WHERE userID = "${id}";`, (err) => {
      if (err) {
        data_removed_string =
          "unable to remove level data, please contact dev using the message command.";
        console.log(err);
      } else {
        data_removed_string = "level data removed.";
      }
    });
    await con.query(`DELETE FROM score WHERE userID = "${id}";`, (err) => {
      if (err) {
        data_removed_string +=
          "\nunable to remove social score data, contact dev using the message command.";
        console.log(err);
      } else {
        data_removed_string += "\nsocial score data removed.";
      }
    });
    await con.query(`DELETE FROM warnings WHERE userID = "${id}";`, (err) => {
      if (err) {
        console.log(err);
        data_removed_string +=
          "\nunable to delete warnings data, contact dev using the message command.";
      }
    });
    await con.query(
      `INSERT INTO ignoredUsers (userID) VALUES ("${message.author.id}");`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    await ignoreusers.execute();
    return message.reply({ content: `${data_removed_string}` });
  },
};
