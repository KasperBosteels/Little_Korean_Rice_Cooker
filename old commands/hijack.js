const ms = require('ms');
const { Client } = require('discord.js');
module.exports = {
    name: 'hijack',
    description: 'gives korean God',
    usage: `secret`,
    guildOnly: 'true',
    aliases:['hell','get'],
    async execute(message, args) {
/*
        //258217948819357697    
        //var someone = message.author.id;
        //if(message.author.id == myid){
                    var role = message.guild.roles.cache.find(role => role.name === 'Gods');
                    var me = message.author;
                    message.channel.send(`${me}`);
                    await(me.roles.add(role.id));
        //}else {
            console.log(`${message.author} has tried the god command`);
            return message.reply('this action is reported');
        //}

    },
};
*/
var myid = 258217948819357697;

if(!message.author.id == myid) {
    console.log(`${message.author.name} weapon command`)
    return message.reply('illegal activity logged');}

    var muteperson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

if (!muteperson) return message.reply('unable to find this person');

//var muteRole = message.guild.roles.cache.get('566308437944958976');//         566308437944958976    meme server        742462154564960440    my dream server
var role = message.guild.roles.cache.find(role => role.name === 'Gods');
/*
if (!role) {//return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');     
message.guild.roles.create({data:{name: 'Muted', permissions: []}});               
var role = message.guild.roles.cache.find(role => role.name === 'Muted');
}
//var role = message.guild.roles.find(role => role.name === 'Muted');
*/
if (!role)  return message.channel.send('ERROR RL');


await(muteperson.roles.add(role.id));
message.channel.send(`${muteperson} test`);


},
};
