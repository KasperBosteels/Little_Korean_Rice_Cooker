const Discord = require('discord.js');
module.exports = {
	name: 'buy',
	description: 'Buy a product.',
	cooldown: 1,
	usage: '<name>  optional: <amount>',
    category: "currency",
    aliases:["get"],
    async execute(client,message, args,con) {

        //if nothing was given ask for more info
       if(!args[0])return message.channel.send('You need to tell me what to buy.');
       var userID = message.author.id
       var amount;
        
       //if no amout is given buy 1
       if(!args[1]){amount = 1;}else{amount = args[1];}
       var product = args[0];
       var ballance,itemID,cost,name,icon,inv;   
        con.query(`SELECT bal.ballance,it.itemID,it.cost,it.name,it.icon, 
        EXISTS(SELECT * FROM inventory AS inv WHERE inv.userID = "${userID}" AND inv.itemID = (SELECT itemID FROM items WHERE NAME = "${product}")) exist FROM currency AS bal, items AS it WHERE userID = "${userID}" AND NAME = "${product}";`,(err,rows) =>{
            if(err)return console.log(err);
            if(rows[0] == undefined)return message.channel.send(`Did you use the command correctly ? ( product amount ) `);
            if(!rows[0].exist == 1 && rows[0] != undefined)return message.channel.send('I couldnt find that sorry.');
             ballance = rows[0].ballance;
             itemID   = rows[0].itemID;
             cost     = rows[0].cost;
             name     = rows[0].name;
             icon     = rows[0].icon;
             inv      = rows[0].exist;
        totalcost = amount * cost;
        if(amount*cost > ballance)return message.channel.send(`you dont have enough money to buy ${amount} ${name}\nyou need at least __${(amount * cost) - ballance}__ *₿* more`);
        if(inv == 1){
            con.query(`UPDATE inventory SET amount = amount + ${amount} WHERE userID = "${userID}" AND itemID = ${itemID};`,(err)=>{if(err)return console.log(err);});
            con.query(`UPDATE currency SET ballance = ballance - ${totalcost} WHERE userID = "${userID}"; `,(err)=>{if(err)return console.log(err);});
            return purchased(message,ballance,name,icon,amount,cost);
        }else {
            con.query(`INSERT INTO inventory (userID,itemID,amount) VALUES ("${userID}",${itemID},${amount});`,(err)=>{if(err)return console.log(err);});
            con.query(`UPDATE currency SET ballance = ballance - ${totalcost} WHERE userID = "${userID}";`,(err)=>{if(err)return console.log(err);});
            return purchased(message,ballance,name,icon,amount,cost);
        }
    });
      
},
    
};
function purchased(message,ballance,name,icon,amount,cost){
    var bed = new Discord.MessageEmbed()
    .setColor('#50C878')
    .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
    .setTitle("**purchase completed**")
    .addField('you bought',`${amount} ${name} ${icon}\nfor a total amount of: __${cost*amount}__ *₿*\nyou have a total of __${ballance-(cost*amount)}__ *₿* left.`)
    message.channel.send(bed);
}
