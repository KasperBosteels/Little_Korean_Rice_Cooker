const Discord = require('discord.js');
module.exports = {
	name: 'give',
	description: 'give an item to a user.',
	cooldown: 1,
	usage: '<@user> <amount> <item>',
    category: "currency",
    aliases:["gift"],
    async execute(client,message, args,con) {
        
        if(!args[0])return message.channel.send('what would you like to buy ?');
        let userID = message.author.id
        var amount,product,receiver,itemID,name,icon,itemDesc,itemamount;
        amount = args[1];
        receiver = message.mentions.users.first().id;
        receiverad = message.mentions.users.first();
        product = args[2];
        if(!args[2])return message.reply("pls use the help command to read  on how to use this command.");
        con.query(`SELECT * FROM items WHERE name = "${product}";`,(err,rows) =>{
        if(err)return console.error(err);
        if(!rows.length)return message.channel.send("item not found.");
            itemID = rows[0].itemID;
            name = rows[0].name;
            icon = rows[0].icon;
            itemDesc = rows[0].itemDesc;
        con.query(`SELECT amount FROM inventory where itemID="${itemID}" AND userID = "${userID}";`,(err,rows) =>{
            if(err)return console.error(err);
            if(!rows.length)return message.reply("you dont have this item sorry.");
            if(!rows[0].amount >= amount)return message.channel.send('you dont have enough of this item.');
            itemamount = rows[0].amount;
           con.query(`SELECT userID from inventory WHERE userID ="${receiver.id}" AND itemID ="${itemID}";`,(err,rows) =>{
            if(err)return console.error(err);
            if(!rows.length){
                con.query(`INSERT INTO inventory (userID,itemID,amount) VALUES ("${receiver}",${itemID},${amount});`);
                con.query(`UPDATE inventory SET amount = ${itemamount - amount} WHERE userID ="${userID}" AND itemID ="${itemID}";`)
                return sendembed(icon,name,amount,receiverad,message);
            }else {
               con.query(`SELECT amount from inventory WHERE userID="${receiver.id}" AND itemID="${itemID}";`,(err,rows)=>{
               if(err)return console.error(err);
                con.query(`UPDATE inventory SET amount = ${rows[0].amount + amount} WHERE userID ="${receiver.id}" AND itemID ="${itemID}";`);
                con.query(`UPDATE inventory SET amount = ${itemamount - amount} WHERE userID ="${userID}" AND itemID ="${itemID}";`);
                return sendembed(icon,name,amount,receiverad,message);   
            });
            }
           });
        });
        });
        

    }
}
function sendembed(itemicon,itemname,amount,receiver,message){
    var bed = new Discord.MessageEmbed()
    .setColor('#50C878')
    .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
    .setTitle("**gift completed**")
    .addField('you gave',`${amount} ${itemname} ${itemicon}\nto: __${receiver}__`);
    message.channel.send(bed);
}