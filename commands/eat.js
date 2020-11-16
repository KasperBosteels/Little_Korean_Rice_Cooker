const Discord = require('discord.js');
const embed = new Discord.MessageEmbed().setTitle('**shop content**').setColor('#FFDF00').setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
var words = ["consumed","devoured","ingested","swallowed","chomped","ingurgitated",];
module.exports = {
	name: 'eat',
	description: 'eat something',
	cooldown: 1,
	usage: ' ',
    category: "currency",
    aliases: ["munch"],
	async execute(client,message, args,con) {
        let product;
        let amount;
        if(!args[0])return;
        if(!args[1]){
            amount = 1;
            product = args[0]
        }else{
        if(isNumeric(args[0])){amount = args[0]; product = args[1];
        }else if(isNumeric(args[1])){amount = args[1]; product = args[0];}else{return message.channel.send('i didnt find that sorry');}
        }
        let itemName=[];
        let itemicon=[];
        con.query(`SELECT name,amount,icon,inventory.itemID FROM inventory,items WHERE inventory.userID = "${message.author.id}" AND items.itemID = (SELECT itemID FROM items where name = "${product}") AND inventory.itemID = items.itemID;`,(err,rows) =>{
        if(err)return console.log(err);
            itemName = rows[0].name;
            itemicon = rows[0].icon;
            if(amount> rows[0].amount)return message.channel.send(`you dont have enough ${itemName} ${itemicon}`);
            con.query(`UPDATE inventory SET amount = amount - ${amount} WHERE userID = "${message.author.id}" AND itemID = ${rows[0].itemID};`,(err)=>{
            if(err)return console.log(err);
            });
            return message.channel.send(makeEmbed(message,itemName,amount))
        });
    },
};
 function makeEmbed(message,name,amount){
    coin = Math.floor(Math.random() * Math.floor(words.length));
    var member = message.guild.member(message.author);
    const bed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setThumbnail(member.user.avatarURL({ dynamic: true, format: 'png', size: 64 }))
    .setTitle("You ate something")
    .setDescription(`${member.displayName} ${words[coin]} ${amount} ${name}'s!`)
    .setTimestamp()
    return bed
}
function isNumeric(num){
    return !isNaN(num);
}