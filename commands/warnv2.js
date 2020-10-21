const fs = require("fs");
const ms = require('ms');
const discord = require("discord.js");
const database = require("../database.json");
const mysql = require("mysql");

module.exports = {
        name: 'warn',
        description: 'give a user a warning, after 5 warnings it wil mute the tagged user for the amount of warnings in minutes.',
        usage: '<@ user> optional:<reason>',
        guildOnly: 'true',
        aliases: ['w'],
        category: "moderating",
        async execute(client,message, args) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm 1 denied');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('perm 2 denied');
       var warnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       var reason = args.slice(1).join(" ");
       if (!warnuser) return message.reply('no user found');
       //#endregion
            //#region connecting database
            var con = mysql.createConnection({
                host: database.host,
                user : database.user,
                password: database.pwd,
                database: database.database
    
            });
            con.connect(err =>{
                if(err) {console.log(err); return message.channel.send('dtb connection issue');} 
            });
            //#endregion
//get data and insert into data base
 con.query(`INSERT INTO warnings (guildID,userID,warnings) VALUES("${message.guild.id}","${warnuser.id}","${reason}")`);
 //get the amounts a user was warned
 await(con.query(`SELECT COUNT(*) AS number FROM warnings where userID = '${warnuser.id}' AND guildID = '${message.guild.id}';`,(err,rows,fields) => {amount = rows[0].number
//#region embed
var embed = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**warned** ${warnuser}\n
    **warned by:** ${message.author}
    **reason:** ${reason}`)
    .addField(`warnings: `,`${amount}`,true)
    .addField(`amount before mute: `,`${amount}/5`,true)
//#endregion

//#region looks for bot-log channel
con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${warnuser.guild.id}")AS exist;`,(err,rows) =>{
  var logchannel;
  if(err)console.log(err);
  if(rows[0].exist != 0){
      con.query(`SELECT channelID AS channel FROM logchannel WHERE guildID = '${warnuser.guild.id}';`,(err,rows) =>{
           logchannel = warnuser.guild.channels.cache.get(rows[0].channel);
           logchannel.send(embed); 

      });
  }else{
      var lognames = ["bot-logs","bot-log","log","botllog"];
      for (let u = 0; u < lognames.length; u++) {
           logchannel = warnuser.guild.channels.cache.find(chan => chan.name === lognames[u]);
          if (logchannel) {
              break;
          }
        }
      // Do nothing if the channel wasn't found on this server
      if (!logchannel) {console.log('no action taken no channel found');
    }else{  logchannel.send(embed); 
    }}
  });
//#endregion
// mute user if true +5 warns
if(amount > 5){
  //looks for mute role if not existing return console log
  var role = message.guild.roles.cache.find(role => role.name === 'Muted');
  if (!role)  return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');

  //makes mute time variable and checks for null if not console log
  let muteTime = amount+'m';
  if (!muteTime) return console.log('not able to determine mutetime in warning');
  if (!muteTime) return message.channel.send('no time input');

  //adds mute role to user
  warnuser.roles.add(role.id);
  message.channel.send(`${warnuser} has been muted for ${muteTime}`);
  
  //sets time out
  setTimeout(() => {
      warnuser.roles.remove(role.id);
      message.channel.send(`${warnuser} has been unmuted`)
  }, ms(muteTime))
}
//#endregion
 }));
 },
};