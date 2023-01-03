const G = require("../Generators/GenerateSimpleEmbed");
const { PermissionsBitField } = require("discord.js");
const loggging = require("../sendToLogChannel");
module.exports = {
  name: "unwarn",
  description: "Resets a users warnings(within server).",
  usage: "<@user>",
  guildOnly: "true",
  aliases: ["uw", "unw", "rw"],
  category: "moderating",
  cooldown: 5,
  perms: ["SendMessages"],
  userperms: ["ModerateMembers"],
  async execute(client, message, args, con) {
    //#region default check
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
      return message.reply({
        content: "You do not have permission to do this.",
      });
    if (!args[0]) return message.reply("no user tagged");
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers))
      return message.reply({ content: "I do not have permission to do this." });
    var unwarnuser = getUserFromMention(args[0], client);
    if (!unwarnuser) return message.reply({ content: "no user found" });
    //#endregion
    //delete warnings from sql server
    await con.manager.delete("Warnings",{user:unwarnuser.id,guild:message.guild.id})
    //#region embed

    await con.manager.findAndCountBy("Warnings",{user:unwarnuser.id,guild:message.guild.id}).then((rows)=>{
        amount = rows[0].number;
        //#endregion
        try {
          let embed = G.GenerateEmbed(
            "#ffa500",
            `**warn reset** ${unwarnuser}\n
          **reset by:** ${message.author}`,
            message,
            false,
            true
          );
          loggging.logWithNoMember(embed, message);
          return message.channel.send({ embeds: [embed] });
        } catch (err) {
          return console.log(err);
        }
      }
    );
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
