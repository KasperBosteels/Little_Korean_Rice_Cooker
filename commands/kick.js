const Discord = require("discord.js");
const { Permissions } = require("discord.js");
const sendembed = require("../sql_serverconnection.js");
module.exports = {
  name: "kick",
  description: "Kick a user.",
  usage: "<@user>",
  guildOnly: "true",
  category: "moderating",
  execute(client, message, args, con) {
    //check perms or if there is a mention
    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply({
        content: "You need the permission to kick members.",
      });
    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply({
        content: "I need the permission to kick members.",
      });
    if (!message.mentions.users.size) {
      return message.reply({
        content: `You need to tag a user in order to make em walk the plank ARRRR!\nlike this <-kick @user>`,
      });
    }

    //get mention and check if user wass succesfully found
    var member = message.mentions.members.first();
    if (!member) return message.reply({ content: "Didn't find that user." });

    //check if user is a mod
    if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return message.reply({ content: "This person is possibly a mod." });
    // Kick
    member
      .kick()
      .then((member) => {
        // Successmessage
        message.channel.send({
          content:
            ":wave: " +
            member.displayName +
            " has been successfully kicked. :woman_cartwheeling: :person_golfing: ",
        });
      })
      .catch(() => {
        // Failmessage
        message.channel.send({ content: "error: 1 in kick" });
      });
    var reason = "No reason given.";
    if (args[1]) reason = args[1];
    sendembed.execute(con, member, 5, MakeEmbed(member, reason), message);
  },
};
function MakeEmbed(reason, member) {
  var embed = new Discord.MessageEmbed()
    .setTitle(`${member.displayName} has been kicked.`)
    .setDescription(`reason: ${reason}`)
    .setTimestamp()
    .setAuthor("Little_Korean_Rice_Cooker", "https://i.imgur.com/A2SSxSE.png");
  return embed;
}
