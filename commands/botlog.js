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

        //check if user wants to remove logchannel
        if(args[0]){
            if(NO(channel,guild,con,args,message)){return message.channel.send("No more bot logs here, i got it.");}
            else{
                if(args[0].toLowerCase() != "no") return message.channel.send("thats not how this works pall.");
                return message.channel.send("For some reason i cant do that, sorry. bot-log ERROR 1");
            }
        }

        //checks if database already exists if true update else insert
        if(normalQuery(guild,channel,con,message)){return message.channel.send("Bot logs incoming")}
        else{
            return message.channel.send("For some reason i cant do that, sorry. bot-log ERROR 2")
        }
    },
};
function permission(message){
//check perms
if (!message.member.hasPermission("BAN_MEMBERS")) return false;
if (!message.guild.me.hasPermission("BAN_MEMBERS"))return false;
return true;
}
function NO(channel,guild,con,args,message){
    if(args[0].toLowerCase() == "no"){
       con.query(`DELETE FROM logchannel WHERE guildID = "${guild}";`,(err) =>{
            if(err){ console.error(err);
            return false;
            }
        });
        return true;
    }
}
function normalQuery(guild,channel,con,message){
    con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
        if(err){ console.log(err); message.channel.send("2.1*"); return false;}
        if(rows[0].exist != 0){
            con.query(`UPDATE logchannel SET channelID = '${channel}' WHERE guildID = '${guild}';`);
        }else{
            con.query(`INSERT INTO logchannel (guildID,channelID) VALUES("${guild}","${channel}");`,(err) =>{
                if(err){ console.log(err); message.channel.send("2.2");return false}
            });
        }
        return true;
});
}