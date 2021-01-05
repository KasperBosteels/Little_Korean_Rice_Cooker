const discord = require("discord.js");
const sqlconnect = require('../sql_serverconnection.js');
module.exports = {
	name: 'purge',
    description: 'delete messages, sadly not your mind',
    args: 'true',
    usage:'<number to delete>',
    aliases: ['delete','remove'],
    category: "moderating",
	execute(client,message, args,con) {
        //check parms
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm2 Denied');

        //get amount to delete
        const amount = parseInt(args[0])+ 1;
        //if no args given or if hte number is between 1 and 100
    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid option.');
    }else if (amount <= 1 || amount >= 99) {
        return message.reply('you need to input a number between 1 and 99.');
    }
    //delete messages
    message.channel.bulkDelete(amount,true);
    sqlconnect.execute(con,message,6,createbed(amount,discord,message),message);
    },
};
function createbed(amount,discord,message){
    var embed = new discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTimestamp()
    .setDescription(`${message.author}\n
     deleted ${amount-1} messages\n
     in ${message.channel}`)
     return embed;
	
}