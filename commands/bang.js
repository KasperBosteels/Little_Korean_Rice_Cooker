module.exports = {
	name: 'bang',
	description: 'bang',
	cooldown: 1,
	usage: ' ',
	execute(message, args) {
		message.channel.send('♪bang bang ♪ he shot me down ♫');
		console.log(`bang ${message.author.tag}`);
	},
};