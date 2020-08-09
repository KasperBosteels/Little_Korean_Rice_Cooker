// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
    client.on('msg', msg => {
        if (!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();

         if (command === 'args-info') {
            if (!args.length) {
                return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
            }
        
            msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
        }
    
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
    });




//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);
msg.send('im awake daddy');





 