module.exports = {
	name: 'resume',
	description: 'Resume a paused song.',
	cooldown: 1,
	usage: '',
	category: "music",
	execute(client,message, args,con,options) {
        let guildData = options.active.get(message.guild.id);
        if(!guildData)return message.channel.send("No music is being played atm.");
        if(message.member.voice.channel != message.guild.me.voice.channel)return message.channel.send('Sorry the bot is not in the same channel as you.');
        if(!guildData.dispatcher.paused)return message.channel.send('Song not paused.');
        guildData.dispatcher.resume();
        return message.channel.send('playing');
    },
};