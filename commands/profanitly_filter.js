const profanity = require('../profanity_enabled');

module.exports = {
	name: 'profanity',
	description: 'enable or disable the profanity filter',
	cooldown: 1,
	usage: ' true / false',
	category: "moderating",
    aliases: ['profanityfilter','prf'],
	execute(client,message, args,con) {
        if(!permission(message))return message.reply('you have no permission to do that.');

        let guildID = message.guild.id;
        //check if needed variables are present
        if(!guildID) return message.reply("something went badly.");

        //get data from local database
        let data = profanity.GET(guildID);
        
        //check if the request was to remove alert
        if(args[0].toLowerCase() == "false"){
            //stop if no data found
            if(data == false)return message.channel.send('No filter was set for this server or it was already removed.');

            con.query(`DELETE FROM profanity_enabled WHERE guildID = '${guildID}';`,(err) =>{
                if(err){
                    console.error(err);
                    return message.channel.send('An error occurred, try again later.\nPS. is this pproblem keeps occuring notify me with the message command');
                }

            }
            );
            profanity.execute(con);
            return message.channel.send('filter is off');
        }else {            

            con.query(`INSERT INTO profanity_enabled (guildID,filtered) VALUES("${guildID}",true)`,(err)=>{
            if(err){
                console.log(err);
                return message.channel.send('An error occurred, try again later.');
            }
            });
            profanity.execute(con);
            return message.channel.send('filter is on');
        }

    },
};
function permission(message){
    //check perms
    if (!message.member.hasPermission("BAN_MEMBERS")) return false;
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))return false;
    return true;
    }