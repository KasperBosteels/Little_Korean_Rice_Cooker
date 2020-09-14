const database = require("../database.json");
const mysql = require("mysql");
module.exports = {
	name: 'bot-log',
	description: '!!in testing!!        assign a channel where the logs go if there are is no specified log channel it wil automatically look for a channel named "bot-logs","bot-log","log" or "botllog"',
	cooldown: 1,
    usage: '<schannel ID> (only works with channel ID)',
    guildOnly: "true",
    aliases:['btl'],
    category: "moderating",
	execute(client,message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('perm 1 Denied');
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))return message.reply('perm 2 Denied');
		var con = mysql.createConnection({
            host: database.host,
            user : database.user,
            password: database.pwd,
            database: database.database

        });
        con.connect(err =>{
            if(err) {console.log(err); message.channel.send('dtb connection issue');} 
        });
        //asigns id to vars
        var channel = message.channel.id;
        var guild = message.guild.id;
        //undefined check
        if (!channel)return console.log('no channel');
        if (!guild)return console.log('no guild');
        con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
        if(err)console.log(err);
        if(rows[0].exist != 0){
            con.query(`UPDATE logchannel SET channelID = '${channel}' WHERE guildID = '${guild}';`);
        }else{
            con.query(`INSERT INTO logchannel (guildID,channelID) VALUES("${guild}","${channel}");`);
        }
        message.channel.send('i will send my logs here now.');
        console.log("log channel chosen");
        
        });
    },
};