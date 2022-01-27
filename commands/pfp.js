const Discord = require("discord.js");
module.exports = {
  name: "pfp",
  description: "Display the pfp of a user.",
  cooldown: 1,
  usage: " <blank> or <@user>",
  category: "fun",
  aliases: ["avatar", "ava"],
  perms: ["SEND_MESSAGES", "ATTACH_FILES"],
  userperms: [],
  async execute(client, message, args, con) {
    let member;
    if (args[0]) {
      member = await message.guild.members.fetch(
        message.mentions.users.first() ||
          client.users.cache.get(args[0]) ||
          client.users.cache.find(
            (user) =>
              user.username.toLowerCase() == args.join(" ").toLowerCase()
          ) ||
          client.users.cache.find(
            (user) => user.tag.toLowerCase() == args.join(" ").toLowerCase()
          )
      );
    } else {
      member = message.member;
    }
    if (!member) member = message.member;

    return message.channel.send({ embeds: [makeEmbed(member)] });
  },
};
function makeEmbed(member) {
  let embed = new Discord.MessageEmbed()
    .setTitle(`${member.user.username}`)
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setTimestamp();
  return embed;
}
