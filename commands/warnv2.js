const discord = require("discord.js");
const {Permissions} = require('discord.js');
const sqlcon = require("../sql_serverconnection.js");
const mute = require("../mutetimer.js");
module.exports = {
        name: 'warn',
        description: 'Warn a user.',
        usage: '<@ user> (optional:<reason>)',
        guildOnly: 'true',
        aliases: ['w'],
        category: "moderating",
        cooldown:10,
        async execute(client,message, args,con) {
       //#region default check
       if(!permissioncheck(message))return message.reply("Either you or i do not have the permission to look at this(kick members permission).");
       if (!args[0]) return message.reply({content:'no user tagged'});
       var warnuser = getUserFromMention(args[0],client)
       var reason = args.slice(1).join(" ");
       if (!warnuser) return message.reply({content:'No user found.'});
       //#endregion
//get data and insert into data base
 con.query(`INSERT INTO warnings (guildID,userID,warnings) VALUES("${message.guild.id}","${warnuser.id}","${reason}")`);
 //get the amounts a user was warned
 await(con.query(`SELECT COUNT(*) AS number FROM warnings where userID = '${warnuser.id}' AND guildID = '${message.guild.id}';`,(err,rows,fields) => {amount = rows[0].number
//#region embed
var embed = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setFooter(message.member.displayName)
    .setTimestamp()
    .setDescription(`**warned** ${warnuser}\n
    **warned by:** ${message.author}
    **reason:** ${reason}`)
    .addField(`warnings: `,`${amount}`,true)
//#endregion

//send embed message to logchannel and channel where the command was given
try {
  sqlcon.execute(con,warnuser,6,embed,message);
}catch(err){
return console.log(err);
}finally{
  message.channel.send({embeds:[embed]});
}
// mute user if true +3 warns
if(amount > 3){
  //looks for mute role if not existing return console log
  var role = message.guild.roles.cache.find(role => role.name === 'Muted');
  if (!role)  return message.channel.send({content:'No mute role, pls make a role named <Muted>(respect the capital letter!!).'});

  //makes mute time variable and checks for null if not console log
  mute.execute(amount+'m',warnuser,role,message);
}
//#endregion
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