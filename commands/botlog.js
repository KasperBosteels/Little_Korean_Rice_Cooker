const sqlcon = require("../sql_serverconnection.js");
module.exports = {
	name: 'bot-log',
	description: 'assign a channel where the logs go if for some reason it cant find the channel it will look for default channels named "bot-logs","bot-log","log" or "botllog"',
	cooldown: 1,
    usage: ' you just type the command in the channel u want the logs to go in. if you want to stop the logs from a certain non-default channel then add "no" after the command like <bot-log no>',
    guildOnly: "true",
    aliases:['btl'],
    category: "moderating",
	execute(client,message,args,con) {
        //check perms
        if(!permission(message))return message.reply('you have no permission to do that.');

        //asigns id to variables
        var channel = message.channel.id;
        var guild = message.guild.id;
        
        //undefined check
        if (!channel)return console.log('no channel');
        if (!guild)return console.log('no guild');

        if(args[0] && args[0].toLowerCase() == "no"){
            con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
                if(err){ console.log(err); message.channel.send("NO 2.1*");}
                if(rows[0].exist != 0){
                    con.query(`DELETE FROM logchannel WHERE guildID = "${guild}";`);
                    message.channel.send('no more logs here');
                }else {
                return message.channel.send("There wasn't any log channel set, if there are still messages popping up try renaming it or sending me a message (-message <you message>).");
                }
            });
        }else {



        //checks if database already exists if true update else insert
        con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
            if(err){ console.log(err); message.channel.send("2.1*");}
            if(rows[0].exist != 0){
                con.query(`UPDATE logchannel SET channelID = '${channel}' WHERE guildID = '${guild}';`);
            }else{
                con.query(`INSERT INTO logchannel (guildID,channelID) VALUES("${guild}","${channel}");`,(err) =>{
                    if(err){ console.log(err); message.channel.send("2.2");}
                });
            }
            return message.channel.send('i will send my log here now');
        });
    }
    },
};
function permission(message){
//check perms
if (!message.member.hasPermission("BAN_MEMBERS")) return false;
if (!message.guild.me.hasPermission("BAN_MEMBERS"))return false;
return true;
}
