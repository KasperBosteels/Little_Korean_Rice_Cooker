const fs = require("fs");
var warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));
const discord = require("discord.js");
    module.exports = {
        name: 'reset warn',
        description: 'resets a users warnings back to 0 (should work)',
        usage: '<@ user>',
        guildOnly: 'true',
        aliases: ['unwarn','uwarn','rw','unw'],
        async execute(message, args) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm 1 denied');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('perm 2 denied');
       var unwarnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!unwarnuser) return message.reply('no user found');
       //reading the json file again cus idk anymore
       warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));
       //if(warnuser.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry not sorry u cant do that smuck!!");
       //#endregion
       
            //checks if a user is in the warning database sets count to 0 else error
            if(!warns[unwarnuser.id]) warns[unwarnuser.id] = {warns: 0};
            warns[unwarnuser.id].warns = 0;
fs.writeFileSync("./warnings.json",JSON.stringify(warns,null,2),(err) => {
    if (err) console.log(err);
});
//#region embed
var embed = new discord.MessageEmbed()
    .setColor('#ffa500')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**warn reset** ${unwarnuser}(${unwarnuser.id})
    **reset by:** ${message.author}`)
    .addField(`amount of warns:`,warns[unwarnuser.id].warns,true)
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

    },
};