module.exports = {
	name: 'invite-me',
	description: 'Gives you a link to invite the bot to a different server.',
	cooldown: 1,
	usage: ' ',
	category: "general",
	aliases: ['link','invite'],
	execute(client,message, args) {
		
        message.channel.send({content:`https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=464133090422&scope=bot`});
	},
};
//https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=189820955766&scope=bot