const Discord = require('discord.js');
module.exports = {
	name: 'whois',
	description: 'get acount details',
	cooldown: 1,
	usage: ' ',
	category: "moderating",
	execute(client,message, args,con) {
        let user
        user = getUserFromMention(args[0],client)
        console.log(user)
        message.channel.send(makeEmbed(user,message))
    },
};
function getUserFromMention(mention,client) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
        mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
        }
    }
    function makeEmbed(user,message){
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setFooter(message.author.username,message.author.displayAvatarURL)
        .setTimestamp();
        embed.addField("username",user.username,inline=true);
        embed.addField("discriminator",user.discriminator,inline=true);
        embed.addField("id",user.id,inline=true);
        embed.addField("avatar",user.avatar,inline=true);
        if(user.game == null){
            embed.addField("game",'no game detected',inline=true);
        }else{
            embed.addField("game",user.game,inline=true);
        }
        embed.addField("bot",user.bot,inline=true);
        embed.addField("creation date",user.createdAt,inline=true);
        embed.setThumbnail(user.avatarURL({ dynamic: true, format: 'png', size: 64 }))

        return embed;
    }