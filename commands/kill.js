const link = ["https://i.imgur.com/dfceOYg.gif","https://i.imgur.com/m8ZtlNO.gif","https://i.imgur.com/umCms9c.gif","https://i.pinimg.com/originals/d4/2d/90/d42d9087479ee3be31ef438e90027c36.gif"
,"https://i.pinimg.com/originals/27/3f/2d/273f2de245154f68ff1f3ff87dd9c929.gif","https://i.pinimg.com/originals/b9/b8/55/b9b8553852804a8ccae9ea607b62fffc.gif"]
const synonyms = ["ended","killed","assasinated","liquidated","exterminated","executed","slaughtered","ate","butchered","iced","zapped","smoked","terminated","commited live'nt on"]
const discord = require('discord.js');
module.exports = {
	name: 'kill',
	description: 'Kill someone.',
	cooldown: 1,
	usage: ' <@user>',
        aliases: ["end","assasinate","liquidate","exterminate","execute","slaughtere","eat","butcher","ice","zapp","smoke","terminate"],
	category: "fun",
	execute(client,message, args,con) {
                
        let coin = Math.floor(Math.random() * Math.floor(link.length));
        let coin2 = Math.floor(Math.random() * Math.floor(synonyms.length));
        let placeholder1,placeholder2;
        placeholder1 = synonyms[coin2];
        placeholder2 = message.mentions.members.first();
        if(!args[0]){placeholder2 = "the VOID";}
        let embed = new discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`${message.author} ${placeholder1} ${placeholder2}`)
        .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
        .setImage(link[coin]);
        console.log("responded with " + link[coin]);
        return message.channel.send(embed);
        
	},
};