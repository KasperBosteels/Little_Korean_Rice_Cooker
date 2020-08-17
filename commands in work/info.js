//const Discord = require("discord.io");
const discord = require('discord.js');
const client = new discord.Client();

module.exports = {
	name: 'info',
	description: 'gives debug info',
	cooldown: 1,
	usage: ' ',
	execute(message, args) {
        const messageembed = new discord.MessageEmbed()
        .setTitle("een titel")
        .setDescription("een beschrijving")
        .setColor("#0099ff")
        .addField(
            {name: "bot name",value:client.user.name}
            
            
        )
    return message.channel.send(messageembed);
    },
};
