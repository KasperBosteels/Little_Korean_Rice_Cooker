const disboard = require('../disboard');
module.exports = {
	name: 'Disboard alert',
	description: 'Start a disboard timer (sends a message every 2 hours, only one alert per server.)',
	cooldown: 1,
	usage: ' (to remove <@user> remove)',
	category: "config",
    aliases: ['disboard','disb'],
	execute(client,message, args,con) {
        //get needed variables
        let user = message.author;
	    let channelID = message.channel.id;
        let guildID = message.guild.id;
        
        //check if needed variables are present
        if (!user) return message.reply('Something went wrong, i was unable to get your id.');
        if(!channelID && !guildID) return message.reply("something went badly.");

        //get data from local database
        let data = disboard.GET(guildID);
        
        //check if the request was to remove alert
        if(args[0] == "remove"){
            //stop if no data found
            if(data == false)return message.channel.send('No alert was set for this channel.');
            //stop if user not moderator
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Only moderators are allowed to set this alert");

            con.query(`DELETE FROM disboard WHERE guildID = '${guildID}';`,(err) =>{
                if(err){
                    console.error(err);
                    return message.channel.send('An error occurred, try again later.\nPS. is this pproblem keeps occuring notify me with message command');
                }

            }
            );
            disboard.execute(con);
            return message.reply('removed alert');
        }else {            
            if(data != false) {
                return message.reply('This server already has an alert set, please remove it first.');
            }

            let time = new Date();
            let currenthour = time.getHours();
            con.query(`INSERT INTO disboard (guildID,channelID,time) VALUES("${guildID}","${channelID}",${currenthour})`,(err)=>{
            if(err){
                console.log(err);
                return message.channel.send('An error occurred, try again later.');
            }
            disboard.execute(con);
            });
            disboard.execute(con);
            return message.channel.send('See you in 2 hours.');
        }

    },
};
