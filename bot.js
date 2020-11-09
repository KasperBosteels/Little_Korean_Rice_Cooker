

//#region get res 
require('dotenv').config();
require('ms')

const logger = require("./logger.js");
const start = require("./startup.js");
const database = require("./database.json");
const sqlconnect = require('./sql_serverconnection.js');
const mysql = require("mysql");
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./auth.json');
const prefixcheck = require('./prefixcheck.js');
const lie = require('./liedetector.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const profanity = require("./profanityfilter.js");
//#endregion

//#region init bot as client
const client = new Discord.Client();
client.commands = new Discord.Collection();
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command)
}
//#endregion

//#region sql login data
//sets sql login data in veriable for use
var con = mysql.createConnection({
    host: database.host,
    user : database.user,
    password: database.pwd,
    database: database.database

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
    console.log('member left')
    var embed = new Discord.MessageEmbed()
   .setColor('#006400')
   .setTitle('oh no')
   .setTimestamp()
   //.setThumbnail(warnuser.user.avatarURL({ dynamic: true, format: 'png', size: 32 }))
   .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
   .setImage(member.user.avatarURL({ dynamic: true, format: 'png', size: 64 }))
   .setDescription(`${member.displayName} left`);
   
   try{
    sqlconnect.execute(con,member,5,embed);
    }catch(err){console.log(err);}  
  });
  //#endregion

//#region member join
//member joins execute sql connection with parameters that correspondt with friendly message in logchannel
client.on('guildMemberAdd',member => {
    console.log("member joined");
    var embed = new Discord.MessageEmbed()
   .setColor('#006400')
   .setTitle('hello')
   .setTimestamp()
   //.setThumbnail(warnuser.user.avatarURL({ dynamic: true, format: 'png', size: 32 }))
   .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
   .setImage(member.user.avatarURL({ dynamic: true, format: 'png', size: 64 }))
   .setDescription(`welcome, ${member.displayName}`);
    
   try{
    sqlconnect.execute(con,member,5,embed);
    }catch(err){console.log(err);} 
  });
  //#endregion
  
//#region message processor
//when a user sends a message
  client.on('message', message => {

       //#region profanity check
        profanity.execute(message);
       //#endregion

        //#region bot ignore
        if(message.author.bot)return;
       //#endregion

       //#region lie detector
        //check if bot is being accused of lying
       lie.execute(message);
       //#endregion

        //#region level handler
        level(message);
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
            command.execute(client,message,args,con);
           logger.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
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
process.on('ECONNRESET',error => {con.connect(con); throw(error) });
process.on('PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR',error =>{throw(error)});
//#endregion

//#region leveling
function level(message){
    var randomint = Math.floor((Math.random()*15)+1);
    var userID = message.author.id;
    con.query(`SELECT * FROM levels WHERE userID = "${userID}";`,(err,rows) =>{
        if(err)console.log(err);
        if(!rows.length){
        con.query(`INSERT INTO levels (userID,level,exp,username) VALUES ("${userID}",1,0,"${message.author.tag}")`);
        }else{
        con.query(`SELECT level ,exp FROM levels WHERE userID = "${userID}"`,(err,rows) =>{
           if(err)return console.log(err);
           var LEV = rows[0].level;
           var EXP = rows[0].exp+randomint;
           if(LEV == null || EXP == null)return console.log(`${LEV}\n${EXP}`);
           var nextlevel =((15 + 300)*LEV)*1.25;
           if(EXP >= nextlevel){LEV++;
            console.log(`${message.author} exp to next: ${nextlevel} exp:${EXP}`);
            var mem = message.guild.member(message.author)
            //#region embed
            var embed = new Discord.MessageEmbed()
            .setColor('#006400')
            .setTitle(':partying_face: level up :partying_face:')
            .setTimestamp()
            .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
            .setImage("https://i.imgur.com/Uyw52SY.gif")
            .setDescription(`YEAH!! ${mem.displayName} reached level ${LEV}\nTO THE STARS AND BEYOND!!`);
            //#endregion
            try{
                sqlconnect.execute(con,mem,6,embed,message);
                }catch(err){console.log(err);} 
            }
           con.query(`UPDATE levels SET level = "${LEV}", exp = "${EXP}" WHERE userID = "${userID}"`)
        });
    }});
    
}
//#endregion

/*cool links
 https://i.imgur.com/18qFmWU.mp4
 https://i.imgur.com/FIZVQik.mp4
 https://imgur.com/t/anime_gifs/p4xuail
*/