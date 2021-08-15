const discord = require("discord.js");
module.exports = {
        name: 'warnings',
        description: 'see the warnings against a user',
        usage: '<@ user> (optional:<reason>)',
        guildOnly: 'true',
        aliases: ['warning',"warns"],
        category: "moderating",
        cooldown:5,
        async execute(client,message, args,con) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('You do not have permission to do this.');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have permission to do this.');
       var warnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!warnuser) return message.reply('No user found.');
       //#endregion
 //get the amounts a user was warned
 await(con.query(`SELECT warnings FROM warnings WHERE userID = ${warnuser.id} AND guildID = ${message.guild.id};`,(err,rows,fields) => {
  let warningsString = "```";
  for (let i = 0; i < rows.length; i++) {
    warningsString += `[${i+1}] ${rows[i].warnings}\n`;
  }
  warningsString += "```";
  var embed = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setFooter(message.member.displayName)
    .setTimestamp()
    .setDescription(`**warnings for:** ${warnuser}\n
    ${warningsString}`);
    return message.channel.send(embed);
 }));
 },
};