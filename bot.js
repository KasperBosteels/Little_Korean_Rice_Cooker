// Run dotenv
require('dotenv').config();
require('ms')
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./auth.json');
const winston = require('winston/lib/winston/config');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const lognames = ["bot-logs","bot-log","log","botllog"];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command)
}
const cooldowns = new Discord.Collection();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    if (client.users.cache.get('258217948819357697'))client.users.cache.get('258217948819357697').send('i am online and ready to go!');
    client.user.setActivity('rice',{type: 'WATCHING'});
});
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    for (let u = 0; u < lognames.length; u++) {
        var logchannel = member.guild.channels.cache.find(chan => chan.name === lognames[u]);
        if (logchannel) {
            break;
        }
          
      }
    // Do nothing if the channel wasn't found on this server
    if (!logchannel) {console.log('logchannel = null');
                      return;}
    // Send the message, mentioning the member
    logchannel.send(`Welcome to the server, ${member}`);
  });
    client.on('message', message => {


        
        //#region profanity-filter
          var messageArray = message.content.split();
          var swear = JSON.parse(fs.readFileSync("./swearwords.json"));
          var sentecUser = "";
          var amountswear = 0;

          for (let Y = 0; Y < messageArray.length; Y++) {

              const word = messageArray[Y].toLowerCase();
              
              var changeword = "";

              for (let i = 0; i < swear["vloekwoorden"].length; i++) {

                if(word.includes(swear["vloekwoorden"][i])){

                  changeword = word.replace(swear["vloekwoorden"][i], "******");

                  sentecUser += " " + changeword;

                  amountswear++;

                }
              }
            if(!changeword){
                sentecUser+= " " + messageArray[Y];
            }
            if (amountswear != 0){
                //message.delete();
                //message.channel.send(sentecUser);
                message.channel.send("no profanity");
                console.log(`profanity  ${message.author.tag}`)
            }
          }
          
          //#endregion
       //#region prefix checker
          if (!message.content.startsWith(config.prefix) || message.author.bot) return;

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
    //#region cool down
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    //#endregion
        try {
            command.execute(message,args);
            var today = new Date();
            var time = today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log(`${message}\n${message.author.tag}      ${time}\n`);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
          
    });



//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);
process.on('uncaughtException',error => console.log('error',error));
process.on('unhandledRejection', error => console.log('error', error));