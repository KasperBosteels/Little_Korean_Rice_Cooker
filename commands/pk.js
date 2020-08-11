module.exports = {
	name: 'permission-check',
	description: 'tells you if you have certain permissions',
	cooldown: 10,
    usage: ' ',
    guildOnly:'true',
    aliases: ['perms','pc'],
	execute(message, args) {
        
        if (message.guild.author.hasPermission('KICK_MEMBERS', { checkAdmin: false, checkOwner: false })) {
            return message.channel.send('This member can kick without allowing admin to override');
        }
        
        if (message.guild.author.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            return message.channel.send('This member can kick and ban');
        }
        if (message.guild.author.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('This member can kick');
        }
        return message.channel.send('this command isnt for u');
	},
};

//https://cdn.discordapp.com/attachments/553322925395017732/736607621947326564/eminem_goose_wildin.webm
//https://cdn.discordapp.com/attachments/553322925395017732/737372592436150302/apple_infinite.mp4