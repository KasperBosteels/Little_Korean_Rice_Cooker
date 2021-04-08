const Discord = require('discord.js');
module.exports = {
	name: 'shop',
	description: 'Display shop contents',
	cooldown: 1,
	usage: ' ',
    category: "currency",
    aliases: ["store"],
	async execute(client,message, args,con) {
        let itemName=[];
        let itemCost=[];
        let itemDesc=[];
        let itemicon=[];
        con.query(`SELECT name,cost,itemDesc,icon FROM items`,(err,rows) =>{
            if(err)return console.log(err);
            for (let i = 0; i < rows.length; i++) {
                itemName[i] = rows[i].name; 
                itemCost[i] = rows[i].cost;
                itemDesc[i] = rows[i].itemDesc;
                itemicon[i] = rows[i].icon;
            }
            return message.channel.send(makeEmbed(itemName,itemCost,itemDesc,itemicon));
        });
    },
};
 function makeEmbed(itemName,itemCost,itemDesc,itemicon){
    const bed = new Discord.MessageEmbed()
    .setTitle('**shop content**')
    .setColor('#FFDF00')
    .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png');
    for (let e = 0; e < itemName.length; e++) {
        bed.addField(`${itemicon[e]} ${itemName[e]}`,`*cost:* *__${itemCost[e]}__* *₿*\n${itemDesc[e]}`)
    }
    return bed
}