//get files for display
const discord = require('discord.js');
const info = require('../package.json');
const prefix = require('../auth.json');
module.exports = {
	name: 'info',
	description: 'gives general info about the bot',
	cooldown: 1,
	usage: ' ',
	execute(client, message, args,con) {

        con.connect(err =>{
            if(err) {console.log(err); var connection = ':x:'}else {var connection = ':white_check_mark:'} 
        //#endregion
       
       //make embed with values of the const
        const messageembed = new discord.MessageEmbed()
        .setTitle(info.name)
        .setDescription(`version: ${info.version}`)
        .setColor(`#228B22`)
        .addField(`author:`,`${info.author}`)
        .addField('Contact',`Have any cool gifs ?,found a bug ?\n pls use "${prefix.prefix}message (your message)".`)
        .addField('Currency',`Currency is available for level 5 users, use "${prefix.prefix}level" to see your current level.`)
        .addField(`discordjs`,`${info.dependencies["discord.js"]}`,true)
        .addField(`dotenv`,`${info.dependencies["dotenv"]}`,true)
        .addField(`ms`,`${info.dependencies["ms"]}`,true)
        .addField(`mysql`,`${info.dependencies["mysql"]}`,true)
        .addField(`sql connection:`,`${connection}`,true)        
        //send embeded message
        return message.channel.send(messageembed);
        });
        //close connection
        con.end();
    },
};
