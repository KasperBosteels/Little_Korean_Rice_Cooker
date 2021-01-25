const ytdl = require('ytdl-core');
module.exports = {
	name: 'sing',
	description: 'I will sing you a song',
	cooldown: 1,
	usage: '<your url>',
	category: "music",
	async execute(client,message, args,con,options) {

        if(!message.member.voice.channel)return message.channel.send('you are not connected to a voice channel.');
        if(!args[0])return message.channel.send('you need to give me a song url.');
        let validate = await ytdl.validateURL(args[0]);
        if(!validate)return message.channel.send('url not found sorry.');
        let info = await ytdl.getInfo(args[0]);
        let data = options.active.get(message.guild.id) || {};

        if(!data.connection)data.connection = await message.member.voice.channel.join();
        if(!data.queue)data.queue = [];
        data.guildID = message.guild.id;
        data.queue.push({
            songTitle: info.videoDetails.title,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id
        });
        if(!data.dispatcher){
            console.log(info.videoDetails.title);
            Play(client,options,data);
        }else{
            message.channel.send(`added to the queue: ${info.videoDetails.title} | requested by: ${message.author.tag}`);
        }
        options.active.set(message.guild.id,data);
    },
    
};
async function Play(client,o,data){
client.channels.cache.get(data.queue[0].announceChannel).send(`PLAYING: ${data.queue[0].songTitle} - requested by: ${data.queue[0].requester}`);
let options = {seek: 3,volume: 1,bitrate: 128000};
data.dispatcher = await data.connection.play(ytdl(data.queue[0].url,{filter: 'audioonly'}), options);
data.dispatcher.guildID = data.guildID;
data.dispatcher.once('finish',function () {
    Finish(client,o,this);
})
}
function Finish(c,o,dispatcher){
let fetchedDate = o.active.get(dispatcher.guildID);
fetchedDate.queue.shift();
if(fetchedDate.queue.length > 0){
    o.active.set(dispatcher.guildID,fetchedDate);
    Play(c,o,fetchedDate);
}else {
    o.active.delete(dispatcher.guildID);
    let voicechannel = c.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if(voicechannel)voicechannel.leave();
}
}