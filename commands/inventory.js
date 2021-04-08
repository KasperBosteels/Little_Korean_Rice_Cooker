const Discord = require('discord.js');
module.exports = {
	name: 'inventory',
	description: 'Display inventory.',
	cooldown: 1,
	usage: ' ',
    category: "currency",
    aliases:["inv"],
	async execute(client,message, args,con) {
            let itemname=[];
            let itemdesc=[];
            let icon=[];
            let amount=[];
            let itemID=[];
        con.query(`SELECT inventory.itemID,items.name,items.itemDesc,items.icon,inventory.amount FROM inventory,items WHERE userID = "${message.author.id}" AND inventory.itemID = items.itemID`,(err,rows) =>{
            if(err)console.log(err);
            if(!rows.length){
            return message.channel.send('Nothing in inventory yet.');
            }
            
            for (let i = 0; i < rows.length; i++) {
               itemname[i] = rows[i].name;
               itemdesc[i] = rows[i].itemDesc;
               icon[i]     = rows[i].icon;
               amount[i]   = rows[i].amount;
               itemID[i]   = rows[i].itemID;
            }
            return message.channel.send(makeEmbed(itemID,message,itemname,itemdesc,icon,amount));
        });

    },
};
 function makeEmbed(itemID,message,itemName,itemDesc,icon,amount){
    var bed = new Discord.MessageEmbed()
    .setColor('#FFDF00')
    .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
    .setTitle(`**${message.author.tag}'s inventory**`);
    for (let e = 0; e < itemID.length; e++) {
       bed.addField(`${icon[e]} ${itemName[e]}   amount: ${amount[e]}`,`${itemDesc[e]}`);
    }
    return bed
}
