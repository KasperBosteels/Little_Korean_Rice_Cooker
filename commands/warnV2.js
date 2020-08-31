const fs = require("fs");
const ms = require('ms');
/*
const sequelize = new sequelize('database','user','password',{
    host: 'localhost',
    dialect: 'sqlite',
    logging: 'false',
    storage: 'database.sqlite',
});
const tags = sequelize.define('tags',{
    id: {
        type: sequelize.STRING,
        unique: true,
    },
    userTag: sequelize.STRING,
    Usage_count: {
        type: sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }

});
*/
const discord = require("discord.js");
    module.exports = {
        name: 'warn',
        description: 'give a user a warning',
        usage: '<@ user> <your warning> (warning is mandatory!)',
        guildOnly: 'true',
        async execute(message, args) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm 1 denied');
       if (!args[0]) return message.reply('no user tagged');
       if (!args[1]) return message.reply('reason is mandatory');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('perm 2 denied');
       var warnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       var reason = args.slice(1).join(" ");
       if (!warnuser) return message.reply('no user found');
       //if(warnuser.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry not sorry u cant do that smuck!!");
       //#endregion



            //checks if a user is in the warning database if not add id and set count to 0
       if(!warns[warnuser.id]) warns[warnuser.id] = {warns: 0};
    warns[warnuser.id].warns++;

fs.writeFile("./warnings.json",JSON.stringify(warns,null,2),(err) => {
    if (err) console.log(err);
});
//#region embed
var amount = warns[warnuser.id].warns;
var muteafter = 5 - warns[warnuser.id].warns;
var embed = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**warned** ${warnuser}(${warnuser.id})
    **warned by:** ${message.author}
    **reason:** ${reason}`)
    .addField(`warnings: `,`${amount}`,true)
    .addField(`amount before mute: `,`${muteafter}`,true)
    
              //{name:'warns before mute:',value:`${}`},);
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

 //#region  mute user if true
 if(amount > 5){
   
    //looks for person to mute if not existing return console log
    var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!muteperson) return console.log('was not able to fin muteperson'+ muteperson.tag);

    //looks for mute role if not existing return console log
    var role = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!role)  return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');

    //makes mute time variable and checks for null if not console log
    let muteTime = amount+'m';
    if (!muteTime) return console.log('not able to determine mutetime in warning');
    if (!muteTime) return message.channel.send('no time input');

    await(muteperson.roles.add(role.id));
    message.channel.send(`${muteperson} has been muted for ${muteTime}`);
    setTimeout(() => {
        
        muteperson.roles.remove(role.id);

        message.channel.send(`${muteperson} has been unmuted`)

    }, ms(muteTime))

 }
 //#endregion
  //sends embed to log channel
  logchannel.send(embed);

    },
};