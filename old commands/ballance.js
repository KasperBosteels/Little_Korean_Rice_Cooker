const Discord = require('discord.js');
module.exports = {
	name: 'balance',
	description: 'Look at all that money.',
	cooldown: 1,
	usage: ' ',
    category: "currency",
    aliases:["bal"],
	async execute(client,message, args,con) {
          
        //ask sql server for amount of money in users wallet
        con.query(`SELECT ballance FROM currency WHERE userID = "${message.author.id}"`,(err,rows) =>{
            if(err)console.log(err);
            if(!rows.length)return message.channel.send('You dont have a wallet.');
            //make and send embed
            return message.channel.send(makeEmbed(message,rows[0].ballance));
        });

    },
};
 function makeEmbed(message,ballance){
    var mem = message.guild.member(message.author);
    var bed = new Discord.MessageEmbed()
    .setColor('#FFDF00')
    .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
    .setTitle(`**${message.author.tag}'s wallet**`)
    .setThumbnail(mem.user.avatarURL({dynamic: true, format: 'png', size: 64}))
    .setDescription(`you have ₿ __${ballance}__  `);
    
    return bed
}
