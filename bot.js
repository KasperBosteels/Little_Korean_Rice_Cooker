// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (msg.content ==='pew'){msg.reply('***dies***');}
    switch (msg.content){
    case    `${config.prefix}meow`:
        msg.reply('pspspspspspspspspsp')
        break;
    case 'ping':
        msg.reply('pong')
        break;
    case 'pew':
        msg.reply('♪bang bang ♪ he shot me down ♫')
        break;

};
});




//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);



























