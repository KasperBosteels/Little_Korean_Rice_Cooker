const discord = require('discord.js');
module.exports = {
    name: 'unmute',
    description: 'Unmute a tagged user.',
    usage: `<@ user>\n`,
    guildOnly: 'true',
    args : 'true',
    category: "moderating",
    aliases:[,'unm',],
    async execute(client,message, args) {

        //control for perms
        if (!message.member.Permissions.has("KICK_MEMBERS")) return message.reply({content:'You do not have permission to do this.'});
        if (!message.guild.me.Permissions.has("KICK_MEMBERS")) return message.reply({content:'I do not have permission to do this.'});
        //assign mention and check if true
        var unmuteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!unmuteperson) return message.reply({content:'Unable to find this person.'});

        //look for role named Muted and check if true
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'Muted - Sx4');
        if (!role) {
        message.reply({content:"Somehting is wrong mute method was unconventional or it was simply miss spelled."});}
     
            //unmute
            unmuteperson.roles.remove(role.id);
    
            //confirmation
            let embed = makeEmbed(message,unmuteperson);
            message.channel.send({embeds:[embed]});
   
    },
};

function makeEmbed(message,unmute){
    var embed = new discord.MessageEmbed()
    .setColor('#ffa500')
    .setTimestamp()
    .setDescription(`**${message.member.displayName}** unmuted **${unmute.displayName}**`);
return embed
}