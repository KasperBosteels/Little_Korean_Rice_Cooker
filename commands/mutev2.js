const ms = require('ms');
module.exports = {
    name: 'mutev2',
    description: 'second iteration of mute command',
    usage: `<@ user> <1-n>s/m/h\nbe aware that after you auto-complete a tag there is already a space so dont type in another space.\n(note: between the number and the consonant is no space)`,
    guildOnly: 'true',
    args : 'true',
    aliases:['mute','silence','shhh'],
    category: "moderating",
    async execute(client,message, args) {


        //check perms
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm2 Denied');

        //get mention and if found succesfully check for mod
        var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!muteperson) return message.reply('unable to find this person');
        if (muteperson.hasPermission('BAN_MEMBERS')) return message.reply('this person is possibly a mod');

        //check if a Muted role is reachable in this server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!role)  return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');
        
        //get requested time to mute if no time given return 
        var muteTime = args[1];
        if (!muteTime) return message.channel.send('no time input');

        //await giving muteperson the mute role
        await(muteperson.roles.add(role.id));
        message.channel.send(`${muteperson} has been muted for ${muteTime}`);

        //set timer for unmute
        setTimeout(() => {
            
            //unmute
            muteperson.roles.remove(role.id);
            message.channel.send(`${muteperson} has been unmuted`)

        }, ms(muteTime))
    

    },
};
