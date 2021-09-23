const discord = require("discord.js");
const {Permissions} = require('discord.js');
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
       if(!permissioncheck(message))return message.reply("Either you or i do not have the permission to look at this(kick members permission).");
       if (!args[0]) return message.reply({content:'no user tagged'});
       var warnuser = getUserFromMention(args[0],client);
       if (!warnuser) return message.reply({content:'No user found.'});
       //#endregion
 //get the amounts a user was warned
 await(con.query(`SELECT warnings FROM warnings WHERE userID = ${warnuser.id} AND guildID = ${message.guild.id};`,(err,rows,fields) => {
  let warningsString = "```";
  if(rows.length == 0)warningsString += 'No warnings.';
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
    return message.channel.send({embeds:[embed]});
 }));
 },
};
function getUserFromMention(mention,client) {
  if (!mention) return;
  if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
      if (mention.startsWith('!')) {
      mention = mention.slice(1);
      }
      return client.users.cache.get(mention);
      }
  }
  function permissioncheck(message){
    //check perms
    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return false;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))return false;
    return true;
}