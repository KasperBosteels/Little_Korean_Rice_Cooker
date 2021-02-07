const pr = require('../getprefixData.js');
const FS = require('fs');
module.exports = {
	name: 'prefix',
	description: 'change the prefix for this server, note that the prefix cannot have a space',
	cooldown: 1,
	usage: ' <your prefix>',
	category: "moderating",
    args: 'true',
    guildOnly: 'true',
	async execute(client,message, args,con) {
        //if(!message.author.hasPermission("KICK_MEMBERS"))return message.reply('permission denied, you are not a moderator.');
        con.query(`SELECT prefix FROM prefix WHERE guildID = "${message.guild.id}";`,(err,rows) =>{
        if(err)return console.error(err);
        if(rows.length){
             con.query(`UPDATE prefix SET prefix ="${args[0]}" WHERE guildID = "${message.guild.id}";`);
        }else {
             con.query(`INSERT INTO prefix (guildID,prefix) VALUES ("${message.guild.id}","${args[0]}");`)
        }
        pr.execute(con);
    });
        return message.channel.send(`updated your prefix to: ${args[0]}`);
	},
};