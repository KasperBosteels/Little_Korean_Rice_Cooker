// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
    client.on('message', message => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
    
    });




//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);





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