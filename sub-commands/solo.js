module.exports = {
	name: 'solo',
	irl: 'false',

	async execute(nsfw) {
	return await nsfw.solo();
	},
};