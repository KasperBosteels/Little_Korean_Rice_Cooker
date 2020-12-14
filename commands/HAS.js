const Discord = require("discord.io");
var cringe = "https://cdn.discordapp.com/attachments/553714556669657101/744704134221135923/video0.mp4"
module.exports = {
	name: 'hassan',
	description: 'chadboi hassan',
	cooldown: 10,
    usage: ' ',
    aliases:['hassan','has','mixedrace'],
    category: "fun",
	async execute(client,message, args) {
      
        //send link if not working catch error
        message.channel.send({files:[cringe]});
        process.on('Missing Permissions', error => {
            if(error.code != 'Missing Permissions'){console.error(error);}
                                                    if(error)message.reply("there is a permissions issue.")});

        return;
	},
};
