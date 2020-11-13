//get files for display
const discord = require('discord.js');
const info = require('../package.json');
const database = require("../database.json");
const mysql = require("mysql");
const prefix = require('../auth.json');
module.exports = {
	name: 'info',
	description: 'gives general info about the bot',
	cooldown: 1,
	usage: ' ',
	execute(client, message, args) {
        //#region sql connection
        var con = mysql.createConnection({
            host: database.host,
            user : database.user,
            password: database.pwd,
            database: database.database

        });
        con.connect(err =>{
            if(err) {console.log(err); var connection = ':x:'}else {var connection = ':white_check_mark:'} 
        //#endregion
       
       //make embed with values of the const
        const messageembed = new discord.MessageEmbed()
        .setTitle(info.name)
        .setDescription(`version: ${info.version}`)
        .setColor(`#228B22`)
        .addField(`author:`,`${info.author}`)
        .addField('Contact',`Hhave any cool gifs or you would like to send me a message ?\n pls use "-message <your message>".`)
        .addField('Currency',`Currency is available for level 5 users, use <${prefix.prefix}level> to see your current level.\nIf any problems occur use <${prefix.prefix}message (your message)> to notify dev.`)
        .addField(`dependencies `,true)
        .addField(`discordjs`,`${info.dependencies["discord.js"]}`,true)
        .addField(`dotenv`,`${info.dependencies["dotenv"]}`,true)
        .addField(`ms`,`${info.dependencies["ms"]}`,true)
        .addField(`mysql`,`${info.dependencies["mysql"]}`,true)
        .addField(`sql connection:`,`${connection}`,true)
        .addField(`winston`,`${info.dependencies["winston"]}`,true)
        
        //send embeded message
        return message.channel.send(messageembed);
        });
        //close connection
        con.end();
    },
};
