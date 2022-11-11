const G = require("../Generators/GenerateSimpleEmbed");
module.exports = {
  name: "pfp",
  description: "Display the pfp of a user.",
  cooldown: 1,
  usage: " <blank> or <@user>",
  category: "fun",
  aliases: ["avatar", "ava"],
  perms: ["SendMessages", "AttachFiles"],
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

    return await message.channel.send({
      embeds: [
        G.GenerateEmbed(
          false,
          false,
          false,
          false,
          true,
          member.user.displayAvatarURL({ dynamic: true, size: 4096 }),
          `${member.user.username}`
        ),
      ],
    });
  },
};
