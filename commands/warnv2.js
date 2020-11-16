const discord = require("discord.js");
const sqlcon = require("../sql_serverconnection.js");
const mute = require("../mutetimer.js");
module.exports = {
        name: 'warn',
        description: 'give a user a warning, after 5 warnings it wil mute the tagged user for the amount of warnings in minutes.',
        usage: '<@ user> optional:<reason>',
        guildOnly: 'true',
        aliases: ['w'],
        category: "moderating",
        async execute(client,message, args,con) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm 1 denied');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('perm 2 denied');
       var warnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       var reason = args.slice(1).join(" ");
       if (!warnuser) return message.reply('no user found');
       //#endregion
//get data and insert into data base
sqlcon.execute(con,warnuser,4);
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
    .addField(`amount before mute: `,`${amount}/5`,true)
    
   
//#endregion
sqlcon.execute(con,warnuser,5,embed);

// mute user if true +5 warns
if(amount > 5){
  //looks for mute role if not existing return console log
  var role = message.guild.roles.cache.find(role => role.name === 'Muted');
  if (!role)  return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');

  //makes mute time variable and checks for null if not console log
  mute.execute(amount+'m',warnuser,role,message);
}
//#endregion
 }));
 },
};