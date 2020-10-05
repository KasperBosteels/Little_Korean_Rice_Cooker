
module.exports = {
	name: 'ping',
    description: 'gives you latency of the bot',
	cooldown : 100,
	category: "debug",
	execute(client,message, args) {
		//get current time and message recieved timestamp subtract and send back 
return message.channel.send('pong: ' +( Date.now() -message.createdTimestamp ) + ' ms');
	},
};