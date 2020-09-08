var pics = ["https://i.imgur.com/1khBL1A.jpg","https://i.imgur.com/m4VG3YG.jpg","https://i.imgur.com/VeQtarH.gif","https://i.imgur.com/NFAgsFL.png","https://i.imgur.com/rjdeye7b.jpg","https://i.imgur.com/i6HcAQgb.jpg","https://imgur.com/t/gotohornyjail/cKUHXnP","https://imgur.com/gallery/M9drq","https://imgur.com/gallery/0fYIZ4B"]
module.exports = {
	name: 'nudes',
	description: 'does this really need an explanation ?',
	cooldown: 1,
    usage: ' ',
    aliases:['isimp','isuck','igea','stevegea'],
    cooldown: 60,
    category: "fun",
	execute(client,message, args) {
        coin = Math.floor(Math.random() * Math.floor(pics.length));
        message.channel.send(`${message.author} YOU ARE A DEGENERATE!!`,{files:[pics[coin]]});

	},
};