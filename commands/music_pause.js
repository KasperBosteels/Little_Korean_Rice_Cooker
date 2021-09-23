const music = require('@koenie06/discord.js-music');
const score = require('../socalCredit');
module.exports = {
	name: 'pause',
	description: 'pause the current song',
	cooldown: 1,
	usage: ' ',
	category: "music",
	async execute(client,message, args,con) {

		music.pause({interaction:message})
		score.ADD(con,1,message.author.id)
	},
};