module.exports = {
	name: 'silence',
	description: 'Make the voice chat silent and serene.',
	cooldown: 1,
	usage: '',
	category: "music",
	async execute(client,message, args,con,options) {

        if(!message.member.voice.channel)return message.channel.send('you are not connected to a voice channel.');
        if(!message.guild.me.voice.channel)return message.channel.send('bot not connected to a voice channel');
        if(message.guild.me.voice.channel.id != message.member.voice.channel.id)return message.channel.send('Sorry, not connected to she same channel.');
		message.guild.me.voice.channel.leave();
		let guildData = options.active.get(message.guild.id);
		if(!guildData)return message.channel.send("No music is being played atm.");
		return guildData.dispatcher.emit('finish');

    },
};