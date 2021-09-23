const profanity = require('../profanity_enabled');
const {Permissions} = require('discord.js');
module.exports = {
	name: 'profanity-filter',
	description: 'enable or disable the profanity filter',
	cooldown: 3,
	usage: ' enable / disable',
	category: "config",
    aliases: ['profanityfilter','prf'],
	execute(client,message, args,con) {
        if(!permission(message))return message.reply({content:'you have no permission to do that.'});

        let guildID = message.guild.id;
        //check if needed variables are present
        if(!guildID) return message.reply({content:"something went badly."});

        //get data from local database
        let data = profanity.GET(guildID);
        
        //check if the request was to remove alert
        if(args[0].toLowerCase() == "disable"){
            //stop if no data found
            if(data == false)return message.channel.send({content:'No filter was set for this server or it was already removed.'});

            con.query(`DELETE FROM profanity_enabled WHERE guildID = '${guildID}';`,(err) =>{
                if(err){
                    console.error(err);
                    return message.channel.send({content:'An error occurred, try again later.\nPS. is this pproblem keeps occuring notify me with the message command'});
                }

            }
            );
            profanity.execute(con);
            return message.channel.send({content:'filter is off'});
        }else {            

            con.query(`INSERT INTO profanity_enabled (guildID,filtered) VALUES("${guildID}",true)`,(err)=>{
            if(err){
                console.log(err);
                return message.channel.send({content:'An error occurred, try again later.'});
            }
            });
            profanity.execute(con);
            return message.channel.send({content:'filter is on'});
        }

    },
};
function permission(message){
    //check perms
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return false;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))return false;
    return true;
    }