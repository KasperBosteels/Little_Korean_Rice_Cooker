const G = require("../Generators/GenerateSimpleEmbed");
const { PermissionsBitField } = require("discord.js");
const logging = require("../sendToLogChannel.js");
module.exports = {
  name: "kick",
  description: "Kick a user.",
  usage: "<@user>",
  guildOnly: "true",
  category: "moderating",
  perms: ["SendMessages", "KickMembers"],
  userperms: ["KickMembers"],
  execute(client, message, args, con) {
    //check perms or if there is a mention
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))
      return message.reply({
        content: "You need the permission to kick members.",
      });
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers))
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
    if (member.permissions.has(PermissionsBitField.Flags.ManageMessages))
      return message.reply({ content: "This person is possibly a mod." });
    // Kick
    let reason = `No reason give, by:${message.author.tag}`;
    if (args[1]) reason = args[1];
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
        let embed = G.GenerateEmbed(
          "#FF0000",
          `reason: ${reason}`,
          (footer = { text: `${member.displayName}`, url: "" }),
          false,
          true,
          `${member.displayName} has been kicked.`
        );
        logging.embedWithLog(member, embed, message);
      })
      .catch(() => {
        // Failmessage
        message.channel.send({ content: "error: 1 in kick" });
      });
  },
};
