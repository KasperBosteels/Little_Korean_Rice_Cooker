const music = require('@koenie06/discord.js-music');
const score = require('../socalCredit');
module.exports = {
	name: 'queue',
	description: "look at the queue'd songs",
	cooldown: 1,
	usage: ' ',
	category: "music",
	async execute(client,message, args,con) {
        

		console.log(await music.getQueue({interaction:message}));
        let Q = array.forEach(element => {
            
        });

		score.ADD(con,1,message.author.id)
	},
};