const ytdl = require('ytdl-core');
module.exports = {
	name: 'silence',
	description: 'leave the voice channel',
	cooldown: 1,
	usage: '',
	category: "fun",
	async execute(client,message, args,con) {

        if(!message.member.voice.channel)return message.channel.send('you are not connected to a voice channel.');
        if(!message.guild.me.voice.channel)return message.channel.send('bot not connected to a voice channel');
        if(message.guild.me.voice.channel.id != message.member.voice.channel.id)return message.channel.send('sorry not connected to she same channel.');
        message.guild.me.voice.channel.leave();
    },
};