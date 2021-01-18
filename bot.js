//#region get res 
require('dotenv').config();
require('ms')
const logger = require("./logger.js");
const start = require("./startup.js");
const sqlconnect = require('./sql_serverconnection.js');
const mysql = require("mysql");
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./auth.json');
const prefixcheck = require('./prefixcheck.js');
const lie = require('./text responses/liedetector.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const subCommandFiles = fs.readdirSync('./sub-commands').filter(file =>file.endsWith('.js'));
const profanity = require("./profanityfilter.js");
const level = require('./level.js');
const rice = require("./text responses/rice.js");
const { Console } = require('console');
const activeSongs = new Map();
//#endregion

//#region init bot as client
const client = new Discord.Client();
client.commands = new Discord.Collection();
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command)
}
client.subcommands = new Discord.Collection();
for (const file of subCommandFiles){
    const subCommand = require(`./sub-commands/${file}`);
    client.subcommands.set(subCommand.name,subCommand);
}
//#endregion
console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.PWD);
console.log(process.env.DATABASE);
//#region sql login data
//sets sql login data in veriable for use
var con = mysql.createConnection({
    host:process.env.HOST,
    user : process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE,
    port: 3306
});


//#endregion

//#region un-used res
//const cooldown = require('./cooldown.js');
//const cooldowns = new Discord.Collection();
//const winston = require('winston/lib/winston/config');
//const prfilter = require('./profanityfilter.js');
//#endregion 

//#region bot ready
//default state when bot starts up will set activity
//and display succes message in terminal
client.on('ready', () => {
    start.execute(client,con);

});
//#endregion

//#region error handler
client.on('error', Err =>{
console.log(`an error occured`)
fs.writeFileSync("./errors.json",JSON.stringify(Err,null,2),(err) => {
    if (err) console.log(err);
});
});
//#endregion

//#region member leave 
//member leaves guild will trigger logchannel check and sad message
client.on('guildMemberRemove',member =>{
    console.log(`member left ${member.displayName} ${member.guild}`);
    var embed = new Discord.MessageEmbed()
   .setColor('#006400')
   .setTitle('oh no')
   .setTimestamp()
   //.setThumbnail(warnuser.user.avatarURL({ dynamic: true, format: 'png', size: 32 }))
   .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
   .setThumbnail(member.user.avatarURL({ dynamic: true, format: 'png', size: 64 }))
   .setDescription(`${member.displayName} left`);
   try{
    sqlconnect.execute(con,member,5,embed);
    }catch(err){console.log(err);}  
  });
  //#endregion

//#region member join
//member joins execute sql connection with parameters that correspondt with friendly message in logchannel
client.on('guildMemberAdd',member => {
    console.log(`member joined ${member.displayName} ${member.guild}`);
    var embed = new Discord.MessageEmbed()
   .setColor('#006400')
   .setTitle('hello')
   .setTimestamp()
   //.setThumbnail(warnuser.user.avatarURL({ dynamic: true, format: 'png', size: 32 }))
   .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
   .setThumbnail(member.user.avatarURL({ dynamic: true, format: 'png', size: 64 }))
   .setDescription(`welcome, ${member.displayName}`);
    
   try{
    sqlconnect.execute(con,member,5,embed);
    }catch(err){console.log(err);} 
  });
  //#endregion
  
//#region message processor
//when a user sends a message
  client.on('message', message => {

        //#region bot ignore
        if(message.author.bot)return;
       //#endregion

        //#region simple responses
        profanity.execute(message);
        lie.execute(message);
        rice.execute(message);
        //#endregion

        //#region prefix check
        //check if messages contains the selected prefix
       if(!prefixcheck.execute(message))return;
        //#endregion

        //#region message slice and dice
        //removes prefix and puts arguments in variable
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        //makes sure command name is lowercase
        const commandName = args.shift().toLowerCase();
        //#endregion
        let options = {
            active: activeSongs
        };
        //#region command lookup
        //checks if message containts a command name/alias if true then asign it to variable if false return to default state
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        //#endregion

        //#region dm applicable check
        //checks if the command is applciable for dm's
        if (command.guildOnly && message.channel.type === 'dm'){
            return message.reply('i can\'t perform this action in personal chat')
        }
        //#endregion

        //#region argumant needed check
        //checks if the command needs an argument if true and no given error message and return to default state
        if (command.args && !args.length){
         let reply = `you didnt provide any arguments, ${message.author}!`;
         if (command.usage){
            reply += `\nThe correct way to use this is:\n\`${command.usage}\`\n for more help type:  \`${config.prefix}help\` or  \`${config.prefix}help ${command.name}\``;
            }
         return message.channel.send(reply);
        }
        //#endregion
    
        //#region execute command
        //tries to perform the command if error occurs catch it and display on terminal
        try {
            command.execute(client,message,args,con,options);
           logger.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
        //#endregion
         
          //#region level handler
          try{
          level.execute(message,con,args,Discord);
        }catch(error){message.channel.send(error.message);}
          //#endregion
          
    });
//#endregion

//#region bot login
//initiate bot by connecting to server and logging in with token
client.login(process.env.DISCORD_TOKEN);
//#endregion

//#region proces error
//if during proces an error occurs catch and display on terminal
process.on('uncaughtException',error => console.log('error',error));
process.on('unhandledRejection', error => console.log('error', error));
process.on('ECONNRESET',error => {con.destroy();con.connect(); console.error(error.message);});
process.on('PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR',error =>{con.connect(); throw(error)});
//#endregion

/*cool links
 https://i.imgur.com/18qFmWU.mp4
 https://i.imgur.com/FIZVQik.mp4
 https://imgur.com/t/anime_gifs/p4xuail
 https://matias.ma/nsfw/
 test
*/