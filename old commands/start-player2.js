const ytdl = require('ytdl-core');
const {joinVoiceChannel,createAudioPlayer, NoSubscriberBehavior} = require('@discordjs/voice');
const player = createAudioPlayer({behaviors:{noSubscriber:NoSubscriberBehavior.Continue},});
//const ytdl = require('ytdl-core-discord');
module.exports = {
	name: 'sing',
	description: 'sing a youtube video',
	cooldown: 2,
	usage: '<youtube url>',
	category: "music",
	async execute(client,message, args,con,options) {

        if(!message.member.voice.channel)return message.channel.send({content:'You are not connected to a voice channel.'});
        if(!args[0])return message.channel.send({content:'You need to give me a song url.'});
        let validate = await ytdl.validateURL(args[0]);
        if(!validate)return message.channel.send({content:'url not found sorry.'});
        let info = await  ytdl.getInfo(args[0]);
        let data = options.active.get(message.guild.id) || {};
        let vc = message.member.voice.channel.id;
        let gvc = message.guild.id;
        let adapter = message.channel.guild.voiceAdapterCreator;
        

        if(!data.connection){
            const connection = joinVoiceChannel({
                channelId: vc,
                guildId: gvc,
                adapterCreator: adapter
            });
        }
        if(!data.queue)data.queue = [];
        data.guildID = message.guild.id;
        data.queue.push({
            songTitle: info.videoDetails.title,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id
        });
        if(!data.dispatcher){
            Play(client,options,data);
        }else{
            message.channel.send({content:`added to the queue: ${info.videoDetails.title} | requested by: ${message.author.tag}`});
        }
        options.active.set(message.guild.id,data);
    },
    
};
async function Play(client,o,data){
client.channels.cache.get(data.queue[0].announceChannel).send({content:`PLAYING: ${data.queue[0].songTitle} - requested by: ${data.queue[0].requester}`});
let options = {seek: 3,volume: 0.7,bitrate: 128000,quality: 'highestaudio',highWaterMark: 300};
data.dispatcher = await data.connection.play(ytdl(data.queue[0].url,{filter: 'audioonly'}), options);
data.dispatcher.guildID = data.guildID;
data.dispatcher.once('finish',function () {
    finish(client,o,this);
})
}
function finish(c,o,dispatcher){
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