const Nsfw = require('discord-nsfw');
const nsfw = new Nsfw();
module.exports = {
	name: 'wallpaper',
    description: 'fancy a new wallpaper?',
	cooldown: 1,
	usage: ' ',
	category: "fun",
	async execute(client,message, args,con) {
	return message.channel.send(await nsfw.wallpaper());
	},
};