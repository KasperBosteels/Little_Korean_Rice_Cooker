module.exports = {
	name: 'ping',
    description: 'Ping!',
    cooldown : 1,
	execute(message, args) {
		message.channel.send('Pong.');
		console.log(`ping 	${message.author.tag}`);

	},
};