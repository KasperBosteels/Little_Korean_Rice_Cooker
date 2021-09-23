const music = require('@koenie06/discord.js-music');
const score = require('../socalCredit');
module.exports = {
	name: 'volume',
	description: 'set the volume.',
	cooldown: 1,
	usage: ' a number between 0 and 100',
	category: "fun",
	async execute(client,message, args,con) {
        if(args[0]>0 || args[0]< 100 || !args[0])return message.reply('You forgot to tell me how loud i should set it(0-100).');

		music.volume({interaction:message,
        volume:args[0]})
		score.ADD(con,1,message.author.id)
	},
};