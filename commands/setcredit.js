const ignore = require("../ignored_users");
const { Permissions } = require("discord.js");
module.exports = {
  name: "setcredit",
  description:
    "Set the social credit of a user manually, anyone with a score lower than 500 will be dealth with more harshly.",
  cooldown: 1,
  usage: "<@user> <social credit>",
  category: "moderating",
  asliases: ["credit", "socialcredit"],
  execute(client, message, args, con) {
    if (!permissioncheck(message)) {
      return message.channel.send({
        content: "sorry you do not have permission to do this.",
      });
    }
    if (isNaN(parseInt(args[1]))) {
      return message.channel.send({
        content: `${args[1]} is not a number\nthis is how you use this command:\n\`\`\`setcredit <@user> <number>\`\`\``,
      });
    }
    let user = getUserFromMention(args[0], client);
    if (!user)
      return message.channel.send({ content: "i could not find this user" });
    let userID = user.id;
    message.channel
      .send({ content: "changing credit..." })
      .then((editableMessage) => {
        con.query(
          `UPDATE score set socialScore=${args[1]} WHERE userID="${userID}"`
        );
        editableMessage.edit({
          content: "credit changed. <:Cooker:910220565955104818>            ",
        });
        ignore.execute(con);
      })
      .catch((err) => {
        return console.log(err);
      })
      .finally((err) => {
        if (err) {
          return message.channel.send({ content: err.message });
        }
      });
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
function permissioncheck(message) {
  //check perms
  if (
    !message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS) ||
    !message.member.permissions.has(Permissions.FLAGS.BAN_MEMBER)
  )
    return false;
  if (
    !message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS) ||
    !message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBER)
  )
    return false;
  return true;
}
