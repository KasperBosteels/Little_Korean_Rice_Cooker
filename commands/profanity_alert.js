const save_channels = require('../profanity_alert_data_collector');
module.exports = {
	name: 'profanity_alert',
	description: 'sends a message when someone uses profanity',
	cooldown: 1,
	usage: ' you use this command in the channel you want the message to apear, to stop message put "stop" after the command.',
	category: "moderating",
	 execute(client,message, args,con) {
         //check perms
         if(!permission(message))return message.reply('you have no permission to do that.');
         //assigns id to variables and check if received
         var channel = message.channel.id;
         var guild = message.guild.id;
         if (!channel)return console.log('no channel');
         if (!guild)return console.log('no guild');
         if(args[0] && args[0].toLowerCase() == "no"){
              con.query(`SELECT EXISTS(SELECT * FROM profanity_alert_channel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
                if(err){ console.log(err); message.channel.send("NO 2.1*");}
                if(rows[0].exist != 0){
                      con.query(`DELETE FROM profanity_alert_channel WHERE guildID = "${guild}";`);
                    message.channel.send('I will not send any profanity alert messages here.');
                }else {
                return message.channel.send("There wasn't any profanity alert channel set, if there are still messages popping up, send me a message (with the message command).");
                }
            });
        }else {
        //checks if database already exists if true update else insert
          con.query(`SELECT EXISTS(SELECT * FROM profanity_alert_channel WHERE guildID = "${guild}")AS exist;`,(err,rows) =>{
            if(err){ console.log(err); message.channel.send("Something broke, i'm sorry.");}
            if(rows[0].exist != 0){
                  con.query(`UPDATE profanity_alert_channel SET channelID = '${channel}' WHERE guildID = '${guild}';`);
            }else{
                  con.query(`INSERT INTO profanity_alert_channel (guildID,channelID) VALUES("${guild}","${channel}");`,(err) =>{
                    if(err){ console.log(err); message.channel.send("Something broke, very sorry.");}
                });
            }
            return message.channel.send('i will send my alerts here now');
        });
        try{
          save_channels.execute(con);
        }catch(err){
            return console.log(err);
        }
    }
         
        
    },
};
function permission(message){
    //check perms
    if (!message.member.hasPermission("BAN_MEMBERS")) return false;
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))return false;
    return true;
    }