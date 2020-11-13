const ms = require('ms');
module.exports = {
    name: 'unmute',
    description: 'unmute a tagged user',
    usage: `<@ user>\n`,
    guildOnly: 'true',
    args : 'true',
    category: "moderating",
    aliases:['speak','unm','talk'],
    async execute(client,message, args) {

        //control for perms
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm-1 Denied');
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply('perm-2 Denied');
        //assign mention and check if true
        var unmuteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!unmuteperson) return message.reply('unable to find this person');

        //look for role named Muted and check if true
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'Muted - Sx4');
        if (!role) {
        message.reply("somehting is wrong mute method was unconventional or it was simply miss spelled");}
     
            //unmute
    unmuteperson.roles.remove(role.id);
    
            //confirmation
    message.channel.send(`${unmuteperson} has been unmuted`)
   
    },
};