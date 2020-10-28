require('dotenv').config();
require('ms')
//#region get important files
const logger = require("./logger.js");
const prfilter = require('./profanityfilter.js');
const start = require("./startup.js");
const database = require("./database.json");
const sqlconnect = require('./sql_serverconnection.js');
const mysql = require("mysql");
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./auth.json');
const winston = require('winston/lib/winston/config');
const prefixcheck = require('./prefixcheck.js');
const lie = require('./liedetector.js');
//const cooldown = require('./cooldown.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const client = new Discord.Client();
client.commands = new Discord.Collection();
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command)
}
const cooldowns = new Discord.Collection();
var con = mysql.createConnection({
    host: database.host,
    user : database.user,
    password: database.pwd,
    database: database.database

});
//#endregion


//when bot is ready to receive commands
client.on('ready', () => {
    start.execute(client);

});

//when a user leaves a guild
client.on('guildMemberRemove',member =>{
       sqlconnect.execute(con,member,1);
  });

//when a new user joins a guild
client.on('guildMemberAdd', member => {
    sqlconnect.execute(con,member,2);    
  });
  
  //when a user sends a message
  client.on('message', message => {

    //get message and use function in the profanityfilter.js
       
       //prfilter.execute(message);
          
       //#region prefix checker
       //#region lie detector
       lie.execute(message);
       
       //#endregion
            if(!prefixcheck.execute(message))return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
       //#endregion
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        
        if (command.guildOnly && message.channel.type === 'dm'){
            return message.reply('i can\'t perform this action in personal chat')
        }
        if (command.args && !args.length){
            let reply = `you didnt provide any arguments, ${message.author}!`;
            if (command.usage){
            reply += `\nThe correct way to use this is:\n\`${command.usage}\`\n for more help type:  \`${config.prefix}help\` or  \`${config.prefix}help ${command.name}\``;
        }
        return message.channel.send(reply);
    }
        
    try {
            command.execute(client,message,args);
           logger.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
          
    });



//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);
process.on('uncaughtException',error => console.log('error',error));
process.on('unhandledRejection', error => console.log('error', error));



/*cool links
 https://i.imgur.com/18qFmWU.mp4
 https://i.imgur.com/FIZVQik.mp4
 https://imgur.com/t/anime_gifs/p4xuail
*/