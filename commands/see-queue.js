module.exports = {
	name: 'queue',
	description: 'Look at the queue for the music player.',
	cooldown: 1,
	usage: '',
	category: "music",
	aliases:['list'],
	execute(client,message, args,con,options) {
let guildData = options.active.get(message.guild.id);
if(!guildData)return message.channel.send('No music is being played atm.');
let queue = guildData.queue;
let nowplaying = queue[0];
let response = `playing: ${nowplaying.songTitle} || requested by: ${nowplaying.requester}. \n\n queue: \n`;
for (let index = 0; index < queue.length; index++) {
response+=`${index}, ${queue[index].songTitle} requested by: ${queue[index].requester}\n`;

}
message.channel.send(response);

    },
};