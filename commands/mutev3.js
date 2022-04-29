const { GenerateEmbed } = require("../Generators/GenerateSimpleEmbed");
const { Permissions } = require("discord.js");
const logging = require("../sendToLogChannel");
module.exports = {
  name: "mute",
  description: "Put a user in time-out for a while.",
  usage: `<@user or ID> <time in minutes(optional)> <reason(optional)>`,
  guildOnly: "true",
  args: "true",
  category: "moderating",
  perms: ["SEND_MESSAGES", "MODATE_MEMBERS"],
  userperms: ["MODERATE_MEMBERS"],
  async execute(client, message, args, con) {
    //check perms
    if (!message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
      return message.reply({
        content: "Permission denied(moderate members).)",
      });
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
      return message.reply({
        content:
          "I do not have the permission to mute a person(moderate members).",
      });

    var muteperson = await message.guild.members.fetch(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!muteperson)
      return message.reply({ content: "Unable to find this person." });
    //get requested time to mute if no time given return
    let mutetime = 60;
    let muteReason = `no reason given by ${message.author.username}`;
    if (!isNaN(parseInt(args[1]))) {
      mutetime = args[1];
      if (args[2]) {
        args.shift();
        args.shift();
        muteReason = args.join(" ");
      }
    } else if (args[1]) {
      args.shift();
      muteReason = args.join(" ");
    }
    try {
      muteperson.timeout(mutetime * 60 * 1000, muteReason);
    } catch (error) {
      console.log(error);
      await muteperson.timeout(500 * 60 * 1000, muteReason);
    } finally {
      logging.logWithNoMember(
        GenerateEmbed(
          "#ffa500",
          `**MUTED** \`\`\`${mute.displayName}\`\`\`\nhas been muted for \n__${mutetime}__ minute(s)\n reason: __${muteReason}__`,
          (footer = {
            text: message.member.displayName,
            url: message.author.displayAvatarUrl,
          }),
          false,
          true
        ),
        message
      );
      message.channel.send({
        embeds: [
          GenerateEmbed(
            "#ffa500",
            `**MUTED** \`\`\`${mute.displayName}\`\`\`\nhas been muted for \n__${mutetime}__ minute(s)\n reason: __${muteReason}__`,
            (footer = {
              text: message.member.displayName,
              url: message.author.displayAvatarUrl,
            }),
            false,
            true
          ),
        ],
      });
      return;
    }
  },
};
