const ms = require('ms');
const Discord = require('discord.js');
const sendembed = require('../sql_serverconnection.js');
module.exports = {
    name: 'mute',
    description: 'silence a user for a given time',
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
        var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!muteperson) return message.reply('unable to find this person');
        if (muteperson.hasPermission('BAN_MEMBERS')) return message.reply('this person is possibly a mod');

        //check if a Muted role is reachable in this server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!role)role = message.guild.roles.cache.find(role => role.name === 'Muted - Sx4');
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
        var embed = new Discord.MessageEmbed()
        .setTitle(`${member.displayName} has been kicked`)
        .setDescription(`reason: ${reason}`)
        .setTimestamp()
        .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
        sendembed.execute(con,member,6,embed,message);

    },
};