const ms = require('ms');
module.exports = {
    name: 'mutev2',
    description: 'a more dynamic version',
    usage: `<@ user> <1-n>s/n/m\nbe aware that after you auto-complete a tag there is already a space so dont type in another space.\n(note: between the number and the consonant is no space)`,
    guildOnly: 'true',
    args : 'true',
    aliases:['mute','silence','shhh'],
    async execute(message, args) {


        //var author = message.author.id;
        //var duckId = 593190985958424586;

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
        //normaal is er al een check
        //if (!args[0]) return message.reply('no tag');
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm2 Denied');

        var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!muteperson) return message.reply('unable to find this person');

        if (muteperson.hasPermission('BAN_MEMBERS')) return message.reply('this person is possibly a mod');

        //var muteRole = message.guild.roles.cache.get('566308437944958976');//         566308437944958976    meme server        742462154564960440    my dream server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        /*
        if (!role) {//return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');     
        message.guild.roles.create({data:{name: 'Muted', permissions: []}});               
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        }
        //var role = message.guild.roles.find(role => role.name === 'Muted');
        */
        if (!role)  return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');
        
        var muteTime = args[1];

        if (!muteTime) return message.channel.send('no time input');

        await(muteperson.roles.add(role.id));
        message.channel.send(`${muteperson} has been muted for ${muteTime}`);
        console.log(`${muteperson.user.tag} has been muted for ${muteTime} by ${message.author.tag}`)
        setTimeout(() => {
            
            muteperson.roles.remove(role.id);

            message.channel.send(`${muteperson} has been unmuted`)

        }, ms(muteTime))
    

    },
};
