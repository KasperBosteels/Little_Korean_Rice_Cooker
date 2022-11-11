const G = require("../Generators/GenerateSimpleEmbed");
const { Permissions } = require("discord.js");
const logging = require("../sendToLogChannel");
module.exports = {
  name: "purge",
  description: "Delete multiple messages.",
  args: "true",
  usage: "<number(1-99)>",
  aliases: ["delete", "remove"],
  category: "moderating",
  cooldown: 2,
  perms: ["SendMessages", "ManageMessages"],
  userperms: ["ModerateMembers", "ManageMessages"],
  async execute(client, message, args, con) {
    //check parms
    if (!message.member.permissions.has(Permissions.Flags.ManageMessages))
      return message.reply({
        content: "You do not have permission to do this.",
      });
    if (!message.guild.me.permissions.has(Permissions.Flags.ManageMessages))
      return message.reply({ content: "I do not have permission to do this." });

    //get amount to delete
    let amount = parseInt(args[0]);
    //if no args given or if hte number is between 1 and 100
    if (isNaN(amount)) {
      return message.reply({
        content: "That doesn't seem to be a valid option.",
      });
    } else if (amount < 1 || amount > 99) {
      return message.reply({
        content: "You need to input a number between 1 and 99.",
      });
    }
    amount++;
    //delete messages
    let success = false;
    try {
      await message.channel.bulkDelete(amount, true);
      success = true;
    } catch (error) {
      success = false;
      console.log(error);
    } finally {
      if (success) {
        logging.logWithNoMember(
          G.GenerateEmbed(
            "#FFFF00",
            `${message.author}\n
    deleted ${amount - 1} messages\n
    in ${message.channel}.`,
            message,
            false,
            true
          ),
          message
        );
      } else {
        logging.logWithNoMember(
          G.GenerateEmbed(
            "#FFFF00",
            `${message.author}\n
        attempte to deleted ${amount - 1} messages\n
        in ${message.channel}, however this failed.`,
            message,
            false,
            true
          ),
          message
        );
      }
    }
  },
};
