var pics = ["https://i.imgur.com/1khBL1A.jpg","https://i.imgur.com/m4VG3YG.jpg","https://i.imgur.com/NFAgsFL.png","https://i.imgur.com/rjdeye7b.jpg","https://i.imgur.com/i6HcAQgb.jpg"]
module.exports = {
	name: 'nudes',
	execute() {
        //get random
        coin = Math.floor(Math.random() * Math.floor(pics.length));
        return pics[coin];
	},
};