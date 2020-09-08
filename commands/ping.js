
module.exports = {
	name: 'ping',
    description: 'Ping!',
	cooldown : 1,
	category: "debug",
	execute(client,message, args) {
		message.channel.send('Pong.');
	},
};