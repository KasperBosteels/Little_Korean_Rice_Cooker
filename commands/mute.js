const ms = require('ms');
const { Message } = require('discord.js');
module.exports = {
    name: 'mute',
    description: 'ahhh sweet silence',
    usage: '<@ user>',
    guildOnly: 'true',
    args : 'true',
    async execute(message, args) {

        if (!message.member.hasPermission("MANAGE_MEMBERS"))     return message.channel.send('Acces Denied');
        var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!user) return message.channel.send('missed try again');

        if (user.hasPermission('MANAGE_MESSAGES')) return message.channel.send("cant mute this person");
        var muteRole = message.member.cache.find("name", "Muted");
        if(!muteRole) return message.channel.send('pls create a Muted role');

        var mutetime = args[1];
        if (!mutetime) return message.channel.send('pls input a time');
        await (user.addRole(muteRole.id));
        message.channel.send(`${user} is muted for ${mutetime}`);
        setTimeout(function(){
            user.removeRole(muteRole.id);
            message.channel.send(`${user} has been unmuted\nbe kind now`);
        }, ms(mutetime));
    },
};