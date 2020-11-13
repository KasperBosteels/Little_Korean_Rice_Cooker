var pics = ["https://i.imgur.com/1khBL1A.jpg","https://i.imgur.com/m4VG3YG.jpg","https://i.imgur.com/NFAgsFL.png","https://i.imgur.com/rjdeye7b.jpg","https://i.imgur.com/i6HcAQgb.jpg"]
module.exports = {
	name: 'nudes',
	description: 'does this really need an explanation ?',
	cooldown: 1,
    usage: ' ',
    cooldown: 60,
    category: "fun",
	execute(client,message, args) {
        //get random
        coin = Math.floor(Math.random() * Math.floor(pics.length));
        
        //get random response from pics send link if error catch
        message.channel.send(`${message.author} YOU ARE A DEGENERATE!!`,{files:[pics[coin]]});
        process.on('Missing Permissions', error => {console.log('error', error)
                                                    if(error)message.reply("there is a permissions issue.")});
	},
};