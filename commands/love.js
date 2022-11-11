const love = require("../jsonFiles/love.json").answer;
const score = require("../DataHandlers/socialCredit");
module.exports = {
  name: "love",
  description: "A loving message.",
  usage: "empty or <@user>",
  cooldown: 1,
  category: "fun",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    const coin = await Math.floor(Math.random() * Math.floor(love.length));
    var manualinput = " ";

    //looks for given arguments
    if (!args[0]) {
      //no arguments reply command
      return message.reply({ content: ` ${love[coin]}` });
    } else {
      score.ADD(con, 200, message.author.id);
      //argument given, assign mention to variable
      var member = message.mentions.members.first();
      if (
        member.id == "397286381883359232" &&
        message.author.id == "258217948819357697"
      ) {
        return message.channel.send({
          content: `${member}\nhttps://tenor.com/biAHU.gif`,
        });
      }
      //if variable == undefined
      if (!member) {
        //assign args array to string
        let arguments_length = args.length;
        for (let i = 0; i < arguments_length; i++) {
          if (args[i] == undefined) {
          } else {
            manualinput += ` ${args[i]}`;
          }
        }
        //return string with text
        return message.channel.send({
          content: `${manualinput}\n${love[coin]} <:cooker:927889501295095879> `,
        });
      } else {
        //return member and text
        return message.channel.send({
          content: `${member}\n${love[coin]} <:cooker:927889501295095879> `,
        });
      }
    }
  },
};
