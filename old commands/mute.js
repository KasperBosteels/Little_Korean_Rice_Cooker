
/*const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'ahhh sweet silence',
    usage: '<@ user> <1-n>s/n/m',
    guildOnly: 'true',
    args : 'true',
    async execute(message, args) {

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
        //normaal is er al een check
        //if (!args[0]) return message.reply('no tag');
        
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');

        var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!muteperson) return message.reply('unable to find this person');

        if (muteperson.hasPermission('MANAGE_MESSAGES')) return message.reply('unable to do this to this person');

        var muteRole = message.guild.roles.cache.get('566308437944958976');// 566308437944958976    meme server
        
        if (!muteRole) return message.channel.send('no mute channel');     // 742462154564960440    my dream server

        var muteTime = args[1];

        if (!muteTime) return message.channel.send('no time input');

        await(muteperson.roles.add(muteRole.id));
        message.channel.send(`${muteperson} has been muted for ${muteTime}`);
        
        setTimeout(() => {
            
            muteperson.roles.remove(muteRole.id);

            message.channel.send(`${muteperson} has been unmuted`)

        }, ms(muteTime))
    

    },
};
*/