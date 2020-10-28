const database = require("../database.json");
const mysql = require("mysql");
const discord = require("discord.js");
const sqlcon = require("../sql_serverconnection.js");

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
                sqlcon.execute(con,person,4);
                //#endregion


//#region looks for bot-log channel
sqlcon.execute(con,person,5,embed);
//#endregion
        

       
        
      
            },
            
        };
