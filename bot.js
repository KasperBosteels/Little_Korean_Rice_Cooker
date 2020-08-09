// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (msg.content ==='ping'){msg.reply('pong');
}
});




//initiate bot by connecting to server
client.login(process.env.DISCORD_TOKEN);



























