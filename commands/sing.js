const { Collection } = require('discord.js');
const search = require('yt-search');
module.exports = {
	name: 'search',
	description: 'i will look for some good tunes.',
	cooldown: 1,
	usage: '',
	category: "music",
	async execute(client,message, args,con,options) {
    search(args.join(" "),function (err,result){
    if(err) return message.channel.send('Something went badly.');
    let videos = result.videos.slice(0,5);
    let response = "numbers:\n";
    for(let vid in videos){
        response += `**[${parseInt(vid)+1}]:** ${videos[vid].title}\r\n`;    
    }
    response += `choose a number between 0 and 5`;
    message.channel.send(response);
    const filter = music => !isNaN(music.content) && music.content < videos.length +1 && music.content > 0;
    const collection = message.channel.createMessageCollector(filter);
    collection.videos = videos;
    collection.once("collect",function (music) {
        let commandFile = require("../commands/play.js");
        commandFile.execute(client,message,[this.videos[parseInt(music.content )-1].url],con,options);
    });
    });

    
    
    },
};