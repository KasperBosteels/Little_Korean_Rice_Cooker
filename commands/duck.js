const ms = require('ms');
const { Client } = require('discord.js');
module.exports = {
    name: 'duck',
    description: 'only the real simps get to use this',
    usage: `secret`,
    guildOnly: 'true',
    args : 'true',
    aliases:['jojo','dio'],
    async execute(message, args) {

        //258217948819357697
        //var someone = message.author.id;
        var duckId = 593190985958424586;
        if(message.author.id == duckId || message.author.id == 258217948819357697){
        var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!muteperson) return message.reply('i cant find him');

        if (muteperson.hasPermission('MANAGE_MESSAGES')) return message.reply('this is abuse of the bot duck');

        //var muteRole = message.guild.roles.cache.get('566308437944958976');//         566308437944958976    meme server        742462154564960440    my dream server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        
        if (!role) return message.channel.send('no corresponding role found ask me to fix');     

        var muteTime = args[1];

        if (!muteTime) return message.channel.send('tick tock says the klock');

        await(muteperson.roles.add(role.id));
        message.channel.bulkDelete(1,true);
        client.users.get(258217948819357697).send(`duck tried to mute ${muteperson} for ${muteTime}`);
        
        setTimeout(() => {
            
            muteperson.roles.remove(role.id);
            Client.users.get('258217948819357697').send(`duck tried to mute ${muteperson} for ${muteTime}`);

        }, ms(muteTime))
    }else return message.reply('donate to my only fans first!!');

    },
};