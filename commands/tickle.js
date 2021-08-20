var tickleDatabase =["https://i.imgur.com/4LT8WJU.gif","https://i.imgur.com/K1XmLDT.gif","https://i.imgur.com/8GfodAL.gif","https://i.imgur.com/VD8nvU5.gif","https://i.imgur.com/DJth4Iz.gif","https://i.imgur.com/bt2ZRjJ.gif","https://i.imgur.com/4oiGtwW.gif","https://i.imgur.com/nexl6h4.gif","https://i.imgur.com/oUYCdNH.gif","https://i.pinimg.com/originals/de/63/73/de6373193dc2b6622ec4178382a6a18b.gif"]
const discord = require('discord.js');
const score = require('../socalCredit');
module.exports = {
	name: 'tickle',
	description: 'Tickle me this, tickle me that.',
	cooldown: 1,
	usage: '<@user>',
	category: "fun",
	execute(client,message, args,con) {
        try{
                score.ADD(con,100,message.author.id)
        }catch(err){
                console.error(err);
        }finally{
                return message.channel.send(createEmbed(message,tickleDatabase,args));
        }
        },
};
function createEmbed(message,tickleDatabase,args){
        let coin = Math.floor(Math.random() * Math.floor(tickleDatabase.length));
        let msg = "";
        if(!message.mentions.members.first() && args.length == 0){
                msg = `${message.client.user} tickles you.`; 
        }else if(args.length > 0 && !message.mentions.members.first()){
                msg = `${message.author} tickles ${args.join(' ')}`
        }
        else{
            msg = `${message.author} tickles ${message.mentions.members.first()}`;    
        }
        let embed = new discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(msg)
        .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
        .setImage(tickleDatabase[coin]);
        console.log("responded with " + tickleDatabase[coin]);
        return embed
}