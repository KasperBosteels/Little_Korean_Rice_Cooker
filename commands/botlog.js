const database = require("../database.json");
const mysql = require("mysql");
module.exports = {
	name: 'bot-log',
	description: '!!work in progress NON FUNCTIONAL!!\nto assign a channel where the logs go if there are no log it wil automatically look for a probable channel',
	cooldown: 1,
    usage: '<schannel ID> (only works with channel ID)',
    guildOnly: "true",
    aliases:['btl'],
	execute(message, args) {
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
        var channel = message.mentions.channels.first().id;
        var guild = message.guild;
        //undefined check
        if (!channel)return console.log('no channel');
        if (!guild)return console.log('no guild');
        //cheks if already in database
        con.query(`SELECT * FROM guildchannels WHERE guildID = '${guild.id}' AND channelId = '${channel}'`,(err,rows) =>{
            if (err)console.log(err);
            if(rows.length > 0){
                return message.channel.send('already done')
            }else {
                //insertions into database
        con.query(`INSERT INTO guildchannels (guildID, channelID) VALUES ("${guild.id}","${channel}")`,(err)=>{ if (err)console.log(err);});
            }
        });
    },
};