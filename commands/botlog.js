const sqlcon = require("../sql_serverconnection.js");
module.exports = {
	name: 'bot-log',
	description: 'assign a channel where the logs go if there is no specified log channel it wil automatically look for a channel named "bot-logs","bot-log","log" or "botllog"',
	cooldown: 1,
    usage: ' you just type the command in the channel u want the logs to go in',
    guildOnly: "true",
    aliases:['btl'],
    category: "moderating",
	execute(client,message, args,con) {
        //check perms
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('perm 1 Denied');
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))return message.reply('perm 2 Denied');

        
        //asigns id to variables
        var channel = message.channel.id;
        var guild = message.guild.id;
        //undefined check
        if (!channel)return console.log('no channel');
        if (!guild)return console.log('no guild');
        sqlcon.execute(con,"false",4);
        //checks if database already exists if true update else insert
        con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
        if(err)console.log(err);
        if(rows[0].exist != 0){
            con.query(`UPDATE logchannel SET channelID = '${channel}' WHERE guildID = '${guild}';`);
        }else{
            con.query(`INSERT INTO logchannel (guildID,channelID) VALUES("${guild}","${channel}");`);
        }
        
        //reply
        message.channel.send('i will send my logs here now.');
        console.log("log channel chosen");
        
        });
    },
};