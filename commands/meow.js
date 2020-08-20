module.exports = {
	name: 'meow',
	description: 'catnip is illegal here',
	cooldown: 1,
	usage: ' ',
	execute(message, args) {
		message.channel.send('pspspspspsps');
		console.log(`meow  ${message.author.tag}`);

	},
};