var pics = ["https://i.imgur.com/1TU37P0.jpg","https://i.imgur.com/m4VG3YG.jpg"]
module.exports = {
	name: 'nudes',
	execute() {
        //get random
        coin = Math.floor(Math.random() * Math.floor(pics.length));
        return pics[coin];
	},
};