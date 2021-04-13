const Discord = require('discord.js');
module.exports = {
	name: 'ava',
	description: 'Display the pfp of a user.',
	cooldown: 1,
	usage: ' <blank> or <@user>',
	category: "fun",
	aliases: ['avatar','pfp'],
        execute(client,message, args,con) {
        let member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username.toLowerCase() == args.join(" ").toLowerCase()) || 
         client.users.cache.find(user => user.tag.toLowerCase() == args.join(" ").toLowerCase()));
         if(!member) member = message.member;
        return message.channel.send(makeEmbed(member));



    },

};
function makeEmbed(member){
        let embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.username}`)
        .setImage(member.user.displayAvatarURL({dynamic: true, size: 4096}))
        .setTimestamp();
        return embed;
}