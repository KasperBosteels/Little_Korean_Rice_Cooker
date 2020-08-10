// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();
let coin;
var sent;
var answers = ["It is certain", 
                   "It is decidedly so", 
                   "Without a doubt", 
                   "Yes - definitely",
                   "You may rely on it", 
                   "As I see it, yes", 
                   "Most likely", 
                   "Outlook good", 
                   "Yes", 
                   "Signs point to yes",
                   "Don't count on it", 
                   "My reply is no",
                   "My sources say no", 
                   "Outlook not so good",
                   "Very doubtful", 
                   "Reply hazy, try again", 
                   "Ask again later", 
                   "Better not tell you now",
                   "Cannot predict now", 
                   "Concentrate and ask again",
                   "Pervert"];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
    client.on('message', message => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
       
       
                 //#region fun
        if (command === 'args-info') {
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }
        
            message.channel.send(`Command name: ${command}\nArguments: ${args}`);}


            
            else if (command === 'coin') {
                let coin = Math.floor((Math.random() * 2) + 1);
                if (coin <= 1){coin = 'tails';}else coin = 'heads';
                return message.channel.send(`${coin}`);
                }
            
                else if (command === 'ask') {
                    if (!args.length) {
                        return message.channel.send(`You didn't ask me anything, ${message.author}!`);
                    }
                    else if (args[0] === 'foo') {
                        return message.channel.send('bar');
                    }
                    sent = args.slice(0,args.length).join(' ');
                     coin = Math.floor(Math.random() * Math.floor(answers.length));
                    return message.reply(`      ${sent}\n ${answers[coin]}`);
                }

                

                else if (command === 'meow') {
                    
                    message.channel.send(`pspspspsps`);
                }
                
                else if (command === 'ping') {
                    
                    message.channel.send(`pong`);
                }
                else if (command === 'bang') {
                    
                    message.channel.send(`♪bang bang ♪ he shot me down ♫`);
                }
                else if (command === 'bangbang') {
                    
                    message.channel.send(`♪Bang ♪bang ♪bang pull my devil trigger♫`);
                }
                //#endregion
                //#region admin
           
                else if (command === 'purge') {
                    const amount = parseInt(args[0])+ 1;
                
                    if (isNaN(amount)) {
                        return message.reply('that doesn\'t seem to be a valid number.');
                    }else if (amount <= 1 || amount > 100) {
                        return message.reply('you need to input a number between 1 and 99.');
                    }
                    message.channel.bulkDelete(amount,true);
                    
                }



                else if (command === 'kick') {
                    if (!message.mentions.users.size) {
                        return message.reply('you need to tag a user in order to make em walk the plank ARRRR');
                    }
                    // grab the "first" mentioned user from the message
                    // this will return a `User` object, just like `message.author`
                    // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
             // Failmessage
            message.channel.send("Access Denied");
        });
                
                }
                //#endregion


               

            
    });




//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);


/*
else if (command === 'args-info') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
	else if (args[0] === 'foo') {
		return message.channel.send('bar');
	}

	message.channel.send(`First argument: ${args[0]}`);
*/
/*
else if (command === 'args-info') {
                if (!args.length) {
                    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
                }
                else if (args[0] === 'foo') {
                    return message.channel.send('bar');
                }
            
                message.channel.send(`First argument: ${args[0]}`);
            }
*/
/*
switch (msg.content){
    case    `${config.prefix}meow`:
        msg.reply('pspspspspspspspspsp')
        break;
    case `${config.prefix}ping`:
        msg.reply('pong')
        break;
    case `${config.prefix}bang`:
        msg.reply('♪bang bang ♪ he shot me down ♫')
        break;
    case `${config.prefix}server`:
        msg.reply(`server name: ${Discord.guild.name}\nTotal members: ${Discord.Guild.length}`);
};
 */
/*


//avatar image command 
 else if (command === 'avatar') {
                    if (!message.mentions.users.size) {
                        return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
                    }
                
                    const avatarList = message.mentions.users.map(user => {
                        return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
                    });
                
                    // send the entire array of strings as a message
                    // by default, discord.js will `.join()` the array with `\n`
                    message.channel.send(avatarList);
                }
                
*/