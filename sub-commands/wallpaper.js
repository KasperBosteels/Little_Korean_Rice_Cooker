const Nsfw = require('discord-nsfw');
const nsfw = new Nsfw();
module.exports = {
	name: 'wallpaper',
    description: 'fancy a new wallpaper?',
	cooldown: 1,
	usage: ' ',
	category: "fun",
	irl:true,
	async execute(client,message, args,con) {
	return await nsfw.wallpaper();
	},
};