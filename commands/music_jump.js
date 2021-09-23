const music = require('@koenie06/discord.js-music');
const score = require('../socalCredit');
module.exports = {
	name: 'jump',
	description: 'jump to a specific song in the queue',
	cooldown: 1,
	usage: ' number of the song',
	category: "music",
	async execute(client,message, args,con) {
        if(!args[0])return message.reply('You forgot to tell me to what song you would like to jump(number within the queue).');
		music.jump({interaction:message,
        number:args[0]})
		score.ADD(con,1,message.author.id)
	},
};