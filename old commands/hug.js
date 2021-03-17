
const discord = require("discord.js");
const hug = require("../jsonFiles/bodily_affection.json");
module.exports = {
	name: 'hug',
	description: 'hug someone',
	cooldown: 1,
    usage: '<@user> or <blank>',
	category: "fun",
	async execute(client,message, args) {
       
        coin = Math.floor(Math.random() * Math.floor(hug.hugs.length));
        var manualinput = " ";
        var huggif = hug.hugs[coin];
        //looks for given arguments
        if (!args[0])
        {
            //no arguments reply command
            

            var embed = new discord.MessageEmbed()
        .setColor('#ff69b4')
        .setFooter(message.member.displayName,message.author.displaAvatarUrl)
        .setTimestamp()
        .setDescription(`${message.client.user} **forcefully hugs** ${message.author}`)
        .setImage(huggif)

        }else {
            //argument given, assign mention to variable
            var member= message.mentions.members.first();

            //if variable == undefined 
            if(!member){
               

                //assign args array to string
                for (let i = 0; i < args.length; i++) {
                    if(args[i] == undefined){}else{
                    manualinput += ` ${args[i]}`;
                    
                }}
                //return string with text
               

                var embed = new discord.MessageEmbed()
            .setColor('#ff69b4')
            .setFooter(message.member.displayName,message.author.displaAvatarUrl)
            .setTimestamp()
            .setDescription(`${message.author} **hugs** ${manualinput}`)
            .setImage(huggif)
            }else {
                var embed = new discord.MessageEmbed()
            .setColor('#ff69b4')
            .setFooter(message.member.displayName,message.author.displaAvatarUrl)
            .setTimestamp()
            .setDescription(`${message.author} **hugs** ${message.mentions.members.first()}`)
            .setImage(huggif)
            }

        }
        
        return message.channel.send(embed);
    
    }
}