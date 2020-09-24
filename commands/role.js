const database = require("../database.json");
const mysql = require("mysql");
const discord = require("discord.js");


        module.exports = {
            name: 'role',
            description: 'gifts a role to a user or removes one.',
            args:'true',
            usage: 'if you want to add a role to a user: <user> <role>\nif you want to remove a role from a user <user> no <role>',
            guildOnly:'true',
            category: "moderating",
            async execute(client,message, args) {
      
        

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');

        var person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!person) return message.reply('unable to find this person');

        if (args[1] == "no")
        {
        }else {
        }
       switch (args[1] == "no") {
           case true:
            var role = message.guild.roles.cache.find(role => role.name === args[2]);
            if (!role)  return message.channel.send('no role found sorry)');
            await(person.roles.remove(role.id));
                    //#region embed
var embed = new discord.MessageEmbed()
.setColor('#FF2D00')
.setTimestamp()
.setDescription(`**removed** ${role.name}\n
**from:** ${person}
**by:** ${message.author}`)
//#endregion
               break;
           case false:
            var role = message.guild.roles.cache.find(role => role.name === args[1]);
            if (!role)  return message.channel.send('no role found sorry)');
            await(person.roles.add(role.id));
                    //#region embed
var embed = new discord.MessageEmbed()
.setColor('#F0FF00')
.setTimestamp()
.setDescription(`**added** ${role.name}\n
**to:** ${person}
**by:** ${message.author}`)
//#endregion
           default:
               break;
       }
       //stops if there is no embed message build becouse this means it didnt go through the switch
       if(!embed)return
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


//#region looks for bot-log channel
con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${person.guild.id}")AS exist;`,(err,rows) =>{
var logchannel;
if(err)console.log(err);
if(rows[0].exist != 0){
  con.query(`SELECT channelID AS channel FROM logchannel WHERE guildID = '${person.guild.id}';`,(err,rows) =>{
       logchannel = person.guild.channels.cache.get(rows[0].channel);
       logchannel.send(embed); 

  });
}else{
  var lognames = ["bot-logs","bot-log","log","botllog"];
  for (let u = 0; u < lognames.length; u++) {
       logchannel = person.guild.channels.cache.find(chan => chan.name === lognames[u]);
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
        

       
        
      
            },
            
        };
