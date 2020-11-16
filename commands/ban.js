const Discord = require("discord.io");
const sqlcon = require("../sql_serverconnection.js");
    module.exports = {
        name: 'ban',
        description: 'a final solution (only one person at a time)',
        usage: '<@ user> optional <reason>',
        guildOnly: 'true',
        aliases: ['die','bye'],
        category: "moderating",
        async execute(client,message, args,con) {
            //check perms
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('perm Denied');
            if (!message.guild.me.hasPermission("BAN_MEMBERS"))return message.reply('perm 2 Denied');
            //check if a person was mentioned
            const user = getUserFromMention(args[0]);
	if (!user) {
		return message.reply('Please use a proper mention if you want to ban someone.');
    }
    var Reason = args[1]
    if(!Reason) Reason = "no given";
    try {
		await message.guild.members.ban(user, { reason: Reason});
	} catch (error) {
		return message.channel.send(`Failed to ban **${user.tag}**: ${error}`);
	}

	 message.channel.send(`:man_police_officer: ${user.tag} has been successfully banned  :man_police_officer: `);

    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setFooter(user.tag,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**BANNED:** ${user.tag}\n
                    Banned by: ${message.author}\n
                    **Reason:** ${reason}`)
    sqlcon.execute(con,member,5,embed);
      
}
}
      



    function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }