module.exports = {
	name: 'continue',
	description: "Go to the next queue'ed song.",
	cooldown: 1,
	usage: '',
	category: "music",
	execute(client,message, args,con,options) {
        let guildData = options.active.get(message.guild.id);
        if(!guildData)return message.channel.send("No music is being played atm.");
        if(message.member.voice.channel != message.guild.me.voice.channel)return message.channel.send('sorry the bot is not in the same channel as you');
        if(message.member.hasPermission('KICK_MEMBERS')){
            message.channel.send('skipped');
            return guildData.dispatcher.emit('finish'); 
        }
        //let amountUsers = message.member.voice.channel.members.size;
        //let amountSkip = Math.ceil(amountUsers/2);
        if(!guildData.queue[0].voteSkips) guildData.queue[0].voteSkips = [];
        if(guildData.queue[0].voteSkips.includes(message.member.id))return;
        guildData.queue[0].voteSkips.push(message.member.id);
        options.active.set(message.guild.id,guildData);
        //if(guildData.queue[0].voteSkips.length >= amountSkip){
            message.channel.send('skipped');
            return guildData.dispatcher.emit('finish');   
        //}
        message.channel.send(`skip requested: ${guildData.voteSkips}/${amountSkip}`);
    },
};