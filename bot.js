// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
//client.on('message', msg => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

switch (command){
    case 'meow':
    return message.channel.send('pspspspspsps')
    break;
}




//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);



























