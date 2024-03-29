const G = require("../Generators/GenerateSimpleEmbed");
const { PermissionsBitField } = require("discord.js");
const logging = require("../sendToLogChannel");
module.exports = {
  name: "unmute",
  description: "Unmute a tagged user.",
  usage: `<@ user>\n`,
  guildOnly: "true",
  args: "true",
  category: "moderating",
  aliases: [, "unm"],
  perms: ["SendMessages", "ModerateMembers"],
  userperms: ["ModerateMembers"],
  async execute(client, message, args, con) {
    //check perms
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
      return message.reply({
        content: "Permission denied(moderate members).)",
      });
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers))
      return message.reply({
        content:
          "I do not have the permission to mute/unmute a member(moderate members).",
      });

    var muteperson = await message.guild.members.fetch(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!muteperson)
      return message.reply({ content: "Unable to find this person." });
    //get requested time to mute if no time given return
    try {
      muteperson.timeout(0);
    } catch (error) {
      console.log(error);
      await muteperson.timeout(0);
    } finally {
      let embed = G.GenerateEmbed(
        "#ffa500",
        `\`\`\`${muteperson.displayName}\`\`\`\nwas unmuted.`,
        message,
        false,
        true,
        false,
        "**UNMUTED**",
        message.url
      );
      logging.logWithNoMember(embed, message);
      message.channel.send({
        embeds: [embed],
      });
      return;
    }
  },
};
