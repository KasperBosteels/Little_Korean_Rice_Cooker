const fs = require("fs");
const database = require("../database.json");
const mysql = require("mysql");
const discord = require("discord.js");
    module.exports = {
        name: 'unwarn',
        description: 'resets a users warnings back to 0 (only the warnings in the current guild)',
        usage: '<@ user>',
        guildOnly: 'true',
        aliases: ['unwarn','uwarn','uw','unw'],
        category: "moderating",
        async execute(client,message, args) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm 1 denied');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('perm 2 denied');
       var unwarnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!unwarnuser) return message.reply('no user found');
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
    con.query(`DELETE FROM warnings WHERE userID = "${unwarnuser.id}" AND guildID = "${message.guild.id}"`);

    //#region embed
    con.query(`SELECT COUNT(*) AS number FROM warnings where userID = '${unwarnuser.id}' AND guildID = '${message.guild.id}';`,(err,rows,fields) => {amount = rows[0].number
var embed = new discord.MessageEmbed()
    .setColor('#ffa500')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**warn reset** ${unwarnuser}\n
    **reset by:** ${message.author}`)
    .addField(`amount of warns:`,amount,true)
    //.addField({name:'amount of warns:',value:`${warns[unwarnuser.id].warns}`});
//#endregion
//#region looks for bot-log channel
  var lognames = ["bot-logs","bot-log","log","botllog"];
  for (let u = 0; u < lognames.length; u++) {
    var logchannel = message.guild.channels.cache.find(chan => chan.name === lognames[u]);
    if (logchannel) {
        break;
    }
      
  }
  //#endregion
 
  //sends embed to log channel
  logchannel.send(embed);
    });
    con.end(err =>{if (err)console.log(err);
    });
    },
};