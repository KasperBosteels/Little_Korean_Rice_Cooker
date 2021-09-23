const ms = require('ms');
const Discord = require('discord.js');
const {Permissions} = require('discord.js');
const sendembed = require('../sql_serverconnection.js');
module.exports = {
    name: 'mute',
    description: 'Mute user for a time.',
    usage: `<@ user> <1-n>s/m/h (note: between the number and the consonant is no space)`,
    guildOnly: 'true',
    args : 'true',
    category: "moderating",
    async execute(client,message,args,con) {


        //check perms
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply({content:'Permission denied.'});
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply({content:'I do not have the permission to mute a person(i need role management).'});

        //get mention and if found succesfully check for mod
        var muteperson = message.guild.members.fetch(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!muteperson) return message.reply({content:'Unable to find this person.'});
        console.log(muteperson.permissions);
        if (muteperson.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply({content:'This person is possibly a mod.'});

        //check if a Muted role is reachable in this server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'Muted - Sx4');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'Muted-Ricefarmer');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'mute');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'muted');
        if(!role)await message.guild.roles.create({data: {name: 'Muted',reason:"New role for muting. -Cooker",permissions : ['VIEW_CHANNEL','READ_MESSAGE_HISTORY']}});
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!role)  return message.channel.send({content:'No mute role, and i cant make one. Would you kindly make a role named "Muted" ?'});
        
        //get requested time to mute if no time given return 
        var muteTime = args[1];
        if (!muteTime) return message.channel.send({content:'No time input.'});

        //await giving muteperson the mute role
        await(muteperson.roles.add(role.id));
        message.channel.send({embeds:[makeEmbed(message,muteperson,muteTime)]});

        //set timer for unmute
        setTimeout(() => {
            
            //check if role deletion is still needed
            if(CheckUserForRole(muteperson,role.id)){
            //unmute
            muteperson.roles.remove(role.id);
            sendembed.execute(con,message.member,6,lastembed(message,muteperson,muteTime),message);
            }
        }, ms(muteTime))
    },
};
function CheckUserForRole(muteperson,roleID){
    if(muteperson.roles.cache.has(roleID)){
        return true;
    }else{return false;}
}
function makeEmbed(message,mute,time){
    var embed = new Discord.MessageEmbed()
    .setColor('#ffa500')
    .setFooter(message.guild.me.displayName)
    .setTimestamp()
    .setDescription(`**${mute.displayName}** has been muted for ${time}.`);
return embed
}
function lastembed(message,mute,time){
    var embed = new Discord.MessageEmbed()
    .setColor('#ffa500')
    .setFooter(message.guild.me.displayName)
    .setTimestamp()
    .setDescription(`**${mute.displayName}** has been unmuted after a break time of ${time}`);
return embed
}