module.exports = {
	name: 'ping',
    description: 'Ping!',
    cooldown : 1000,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};