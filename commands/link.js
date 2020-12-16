module.exports = {
	name: 'links',
	description: 'gives you some handy links in your dm\'s',
	cooldown: 1,
	usage: ' ',
	category: "general",
	aliases: ['link'],
	execute(client,message, args) {
		
        message.author.send(`https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=805694518&scope=bot \n https://matias.ma/nsfw/ \n `)
	},
};