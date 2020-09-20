var cringe = "https://cdn.discordapp.com/attachments/553714556669657101/744704134221135923/video0.mp4"
module.exports = {
	name: 'hassan',
	description: 'chadboi hassan',
	cooldown: 10,
    usage: ' ',
    aliases:['hassan','has','mixedrace'],
    category: "fun",
	async execute(client,message, args) {
        //coin = Math.floor(Math.random() * Math.floor(pics.length));
        //message.channel.send(`${message.author} YOU ARE A DEGENERATE!!`,{files:[pics[coin]]});
        message.channel.send({files:[cringe]});
        process.on('Missing Permissions', error => {console.log('error', error)
                                                    if(error)message.reply("there is a permissions issue.")});
	},
};