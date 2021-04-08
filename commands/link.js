module.exports = {
	name: 'invite-me',
	description: 'Gives you a link to invite the bot to a different server.',
	cooldown: 1,
	usage: ' ',
	category: "general",
	aliases: ['link'],
	execute(client,message, args) {
		
        message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=8&scope=bot`);
	},
};