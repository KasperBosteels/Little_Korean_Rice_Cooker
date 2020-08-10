// Run dotenv
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//let coin;
//var sent;
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
    client.on('message', message => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
       
        if (!client.commands.has(commandName))return;
        const command = client.commands.get(commandName);
        
        if (command.guildOnly && message.channel.type === 'dm'){
            return message.reply('i can\'t is this command in personal chat')
        }
        if (command.args && !args.length){
            let reply = `you didnt prive any arguments, ${message.author}!`;
            if (command.usage){
            reply += `\nThe correct way to use this is: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }


        try {
            command.execute(message,args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
            
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