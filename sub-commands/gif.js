module.exports = {
    name: 'gif',
    irl: "true",

	async execute(nsfw) {
	return await nsfw.pgif();
	},
};