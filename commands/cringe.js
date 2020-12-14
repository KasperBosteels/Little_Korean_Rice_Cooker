const Discord = require("discord.io");
var cringe = "https://cdn.discordapp.com/attachments/553714556669657101/744700534149087242/video0.mp4"
module.exports = {
	name: 'cringe',
	description: 'mixed race marriages ?',
	cooldown: 10,
    usage: ' ',
    category: "fun",

	async execute(client,message, args) {

        //sends link 
        message.channel.send({files:[cringe]});

	},
};
