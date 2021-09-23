module.exports = {
	name: 'stop',
	description: 'Make the voice chat silent and serene.',
	cooldown: 1,
	usage: '',
	category: "music",
	aliases:['silence'],
	async execute(client,message, args,con,options) {

        if(!message.member.voice.channel)return message.channel.send({content:'You are not connected to a voice channel.'});
        if(!message.guild.me.voice.channel)return message.channel.send({content:'Bot not connected to a voice channel'});
        if(message.guild.me.voice.channel.id != message.member.voice.channel.id)return message.channel.send({content:'Sorry, not connected to she same channel.'});
		message.guild.me.voice.channel.leave();
		let guildData = options.active.get(message.guild.id);
		if(!guildData)return message.channel.send({content:"No music is being played atm."});
		for (let i = 0; i < options.active.length; i++) {
			
			options.active[i].delete(message.guild.id);			
		}
		return guildData.dispatcher.emit('finish');
    },
};