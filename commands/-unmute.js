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


        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm-1 Denied');
        //normaal is er al een checkkare
        //if (!args[0]) return message.reply('no tag');
        
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply('perm-2 Denied');

        var unmuteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!unmuteperson) return message.reply('unable to find this person');

        //var muteRole = message.guild.roles.cache.get('566308437944958976');//         566308437944958976    meme server        742462154564960440    my dream server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        
        if (!role) {//return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');     
        message.reply("somehting is wrong mute method was unconventional");
        }
     
    unmuteperson.roles.remove(role.id);
    

    message.channel.send(`${unmuteperson} has been unmuted`)
    console.log(`unmute     ${unmuteperson.user.tag}     by: ${message.author.tag}`);
    },
};