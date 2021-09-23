const music = require('@koenie06/discord.js-music');
const score = require('../socalCredit');
const events = music.event;
module.exports = {
	name: 'play',
	description: 'I will sing the song of my people.',
	cooldown: 1,
	usage: ' [name of the song]',
	category: "music",
	async execute(client,message, args,con) {
        let Vchannel,song;
        Vchannel = message.member.voice.channel;
        if(!Vchannel)return message.reply('You are not in a voice channel.');
        song = args.join(' ');
        music.play({
            interaction:message,
            channel:Vchannel,
            song:song, 
        });

		score.ADD(con,1,message.author.id)
	},
    
};
events.on('playsong',async(channel,songInfo,requester)=>{
    channel.send({content:`starting: ${songInfo.title} - by: ${songInfo.author}\n requested by: ${requester.tag}`});      
});
events.on('addSong',async(channel,songInfo,requester)=>{
    channel.send({content:`added song to the queue: ${songInfo.title} - by: ${songInfo.author}\nrequested by: ${requester.tag}`});      
});