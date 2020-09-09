//const Discord = require("discord.io");
const discord = require('discord.js');
const info = require('../package.json');
const database = require("../database.json");
const mysql = require("mysql");
module.exports = {
	name: 'info',
	description: 'gives general info about the bot',
	cooldown: 1,
	usage: ' ',
	execute(client, message, args) {
        var con = mysql.createConnection({
            host: database.host,
            user : database.user,
            password: database.pwd,
            database: database.database

        });
        con.connect(err =>{
            if(err) {console.log(err); var connection = ':x:'}else {var connection = ':white_check_mark:'} 
        
        const messageembed = new discord.MessageEmbed()
        .setTitle(info.name)
        .setDescription(`version: ${info.version}`)
        .setColor(`#228B22`)
        .addField(`author:`,`${info.author}`)
        .addField(`dependencies `,true)
        .addField(`discordjs`,`${info.dependencies["discord.js"]}`,true)
        .addField(`dotenv`,`${info.dependencies["dotenv"]}`,true)
        .addField(`ms`,`${info.dependencies["ms"]}`,true)
        .addField(`mysql`,`${info.dependencies["mysql"]}`,true)
        .addField(`sql connection:`,`${connection}`,true)
        .addField(`winston`,`${info.dependencies["winston"]}`,true)
        return message.channel.send(messageembed);
        });
        con.end();
    },
};
