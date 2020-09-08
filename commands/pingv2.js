
module.exports = {
	name: 'ping',
    description: 'gives you latency of the bot',
	cooldown : 1,
	category: "debug",
	execute(client,message, args) {
return message.channel.send('pong: ' +( Date.now() -message.createdTimestamp ) + ' ms');
	},
};