module.exports = {
	name: 'volume',
	description: 'catnip should be illegal',
	cooldown: 1,
	usage: '',
	category: "music",
	execute(client,message, args,con,options) {
        let guildData = options.active.get(message.guild.id);
        if(!guildData)return message.channel.send("No music is being played atm.");
        if(message.member.voice.channel != message.guild.me.voice.channel)return message.channel.send('sorry the bot is not in the same channel as you');
        if(isNaN(args[0])|| args[0] > 150 || args[0] < 0)return message.channel.send('Please only volume settings between 150 and 0.');
        guildData.dispatcher.setVolume(args[0]/100);
        return message.channel.send(`volume changed to ${args[0]}%`);

},
};