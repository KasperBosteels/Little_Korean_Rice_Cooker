const search = require('yt-search');
const {MessageEmbed} = require('discord.js');
module.exports = {
	name: 'youtube',
	description: 'I will look for some good videos.',
	cooldown: 2,
	usage: '<title>',
    aliases: ['yt'],
	category: "fun",
	async execute(client,message, args,con,options) {
        if(!args[0])return message.channel.send({content:"U gotta give me a clue at least."});
    search(args.join(" "),function (err,result){
    if(err) {console.log(err); return message.channel.send({content:'Something went badly. error: 7'});}
        let videos = result.videos.slice(0,5);
    message.channel.send(videos[0].url);
    });
    },
};
