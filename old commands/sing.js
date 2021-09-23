const search = require('yt-search');
module.exports = {
	name: 'searchsong',
	description: 'I will look for some good tunes.',
	cooldown: 3,
	usage: '<a title> When you get a list of songs press the number of the corresponding song u want.',
	category: "music",
	async execute(client,message, args,con,options) {
        if(!args[0])return message.channel.send({content:"U gotta give me a clue at least."});
    await search(args.join(" "),function (err,result){
    if(err){
        console.log(err);
        return message.channel.send({content:'Something went badly.'});
    } 
    let videos = result.videos.slice(0,5);
    let response = "```JS\nnumbers:\n**[0]:**to cancel this command\n";
    for(let vid in videos){
        response += `**[${parseInt(vid)+1}]:** ${videos[vid].title}\r\n`;    
    }
    response += "choose a number between 0 and 5\n```";
    message.channel.send({content:response});
    const filter = music => !isNaN(music.content) && music.content < videos.length +1;
    const collection = message.channel.createMessageCollector(filter);
    collection.videos = videos;
    collection.once("collect",function (music) {
        if(music.content == 0)return message.channel.send({content:"command cancelled"});
        let commandFile = require("./start-player.js");
        commandFile.execute(client,message,[this.videos[parseInt(music.content )-1].url],con,options);
    });
    });
    },
};