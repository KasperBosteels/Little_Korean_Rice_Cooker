const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));
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
       if(!warns[warnuser.id]) warns[warnuser.id] = {
    warns: 0
};
    warns[warnuser.id].warns++;

fs.writeFile("./warnings.json",JSON.stringify(warns),(err) => {
    if (err) console.log(err);
});
//#region embed
var embed = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**warned** ${warnuser}(${warnuser.id})
    **warned by:** ${message.author}
    **reason:** ${reason}`)
    .addField(`${warns[warnuser.id].warns}`);
//#endregion
//#region looks for bot-log channel
  var lognames = ["bot-logs","bot-log"];
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