const leveling = require('../leveling_enabled');

module.exports = {
	name: 'level_system',
	description: 'Enable or disable the level system.',
	cooldown: 1,
	usage: ' enable / disable',
	category: "config",
    aliases: ['leveling','level_system'],
	execute(client,message, args,con) {
        if(!permission(message))return message.reply('You have no permission to do that.');

        let guildID = message.guild.id;
        //check if needed variables are present
        if(!guildID) return message.reply("Something went badly.");

        //get data from local database
        let enable = leveling.GET(guildID);
        
        //check if the request was to remove alert
        if(args[0].toLowerCase() == "disable"){
            //stop if no data found
            if(enable == 0)return message.channel.send('Leveling is disabled in this server.');
            con.query(`DELETE FROM leveling_enabled WHERE guildID = '${guildID}';`,(err) =>{
                if(err){
                    console.error(err);
                    return message.channel.send('An error occurred, try again later.\nerror: '+err.name+'\nPS. is this pproblem keeps occuring notify me with the message command.');
                }
            }
            );
            leveling.execute(con);
            return message.channel.send('Leveling system is disabled.');
        }else if (args[0].toLowerCase() == "enable"){            
            if(enable == true)return message.channel.send('Leveling is already enabled in this server.');
            con.query(`INSERT INTO leveling_enabled (guildID,enabled) VALUES("${guildID}",1)`,(err)=>{
            if(err){
                console.log(err);
                return message.channel.send('An error occurred, try again later.');
            }
            });
            leveling.execute(con);
            return message.channel.send('Leveling is enabled.');
        }else {
            return message.channel.send('Something went wrong, if this problem keeps occuring use the message command to let the dev know.')
        }

    },
};
function permission(message){
    //check perms
    if (!message.member.hasPermission("BAN_MEMBERS")) return false;
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))return false;
    return true;
    }