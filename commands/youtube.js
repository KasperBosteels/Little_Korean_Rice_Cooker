const search = require('yt-search');
const {MessageEmbed} = require('discord.js');
module.exports = {
	name: 'youtube',
	description: 'i will look for some good videos.',
	cooldown: 1,
	usage: '<title>',
    aliases: ['yt'],
	category: "fun",
	async execute(client,message, args,con,options) {
        if(!args[0])return message.channel.send("U gotta give me a clue at least.");
    search(args.join(" "),function (err,result){
    if(err) {console.log(err); return message.channel.send('Something went badly.');}
        let videos = result.videos.slice(0,5);
    message.channel.send(videos[0].url);
    });
    },
};