const { PermissionsBitField } = require("discord.js");
module.exports = {
  name: "ban",
  description: "Ban user.",
  usage: "<@user> <reason (optional)>",
  guildOnly: "true",
  category: "moderating",
  cooldown: 1,
  perms: ["BanMembers", "SendMessages"],
  userperms: ["BanMembers"],
  async execute(client, message, args, con) {
    //check permissions of user
    if (!permissioncheck(message))
      return message.reply({
        content: "You or i don't have the right permissions to do that.",
      });
    //check if a person was mentioned
    const user = await getUserFromMention(args[0], client, message);
    if (!user) {
      return message.reply({
        content: "Please use a proper mention if you want to ban someone.",
      });
    }
    //look if reason was given for ban from the server
    args.shift();
    var Reason = args.join(" ");
    if (!Reason) Reason = `no reason given by ${message.author.username}`;
    try {
      //try to ban member with reason
      await message.guild.members.ban(user, {
        deleteMessageSeconds: 24 * 60 * 60,
        reason: Reason,
      });
      await message.channel.send({
        content: `:man_police_officer: ${user.username} has been successfully banned :man_police_officer: `,
      });
    } catch (error) {
      //if unsucsessfull display failed message
      return message.channel.send({
        content: `Failed to ban **${user.username}**: ${error}`,
      });
    }
  },
};
function permissioncheck(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
    return false;
  if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers))
    return false;
  return true;
}
//advanced identifier for user to not ban the wrong person
function getUserFromMention(mention, client, message) {
  if (!mention) return;
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
    return client.users.cache.get(mention);
  } else if (!isNaN(parseInt(mention))) {
    return message.guild.members.fetch(
      message.guild.members.cache.get(mention)
    );
  }
}
