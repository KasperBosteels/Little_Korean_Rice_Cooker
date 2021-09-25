const music = require('@koenie06/discord.js-music');
const events = music.event;
module.exports = {
	name: 'musicChecks',
	description: 'checks song stuff',
	cooldown: 1,
	usage: ' ',
	category: "music",
	async isplaying(client,message, args,con) {

		let isplaying = await music.isPlaying({interaction:message})
		return isplaying;
	},
    async ispaused(client,message, args,con) {

		let isplaying = await music.ispaused({interaction:message})
		return isplaying;
	},
    async isresumed(client,message, args,con) {

		let isplaying = await music.isResumed({interaction:message})
		return isplaying;
	},
    async isrepeated(client,message, args,con) {

		let isplaying = await music.isRepeated({interaction:message})
		return isplaying;
	},
    
};

