const discord = require("discord.js");
const {Permissions} = require("discord.js");

const sqlconnect = require('../sql_serverconnection.js');
module.exports = {
	name: 'purge',
    description: 'Delete multiple messages.',
    args: 'true',
    usage:'<number>',
    aliases: ['delete','remove'],
    category: "moderating",
    cooldown:2,
	execute(client,message, args,con) {
        //check parms
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply({content:'You do not have permission to do this.'});
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply({content:'I do not have permission to do this.'});

        //get amount to delete
        const amount = parseInt(args[0])+ 1;
        //if no args given or if hte number is between 1 and 100
    if (isNaN(amount)) {
        return message.reply({content:'That doesn\'t seem to be a valid option.'});
    }else if (amount <= 1 || amount >= 99) {
        return message.reply({content:'You need to input a number between 1 and 99.'});
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
     in ${message.channel}.`)
     return embed;
	
}