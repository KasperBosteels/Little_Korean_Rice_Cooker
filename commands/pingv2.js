
module.exports = {
	name: 'ping',
    description: 'Ping!',
	cooldown : 1,
	category: "debug",
	execute(client,message, args) {
return message.channel.send('pong: ' +( Date.now() -message.createdTimestamp ) + ' ms');
	},
};