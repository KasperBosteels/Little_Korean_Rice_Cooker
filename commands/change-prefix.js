const sqlcon = require("../sql_serverconnection.js");
module.exports = {
	name: 'change predix',
	description: 'change the prefix for commands <<this is work in progress not working yet>>',
	cooldown: 1,
    usage: ' ! (as example)',
    guildOnly: "true",
    aliases:['prefix'],
    category: "moderating",
	async execute(client,message,args,con) {
        let prefix = GetPrefix(message.guild.id,con);
        if(prefix == false){
        AddPrefix(message.guild.id,args,con);
        }
    },
    }





    function GetPrefix(guild,con){
        con.query(`SELECT prefix from prefix WHERE guildID = "${guild}"`,(err,rows) =>{
            if(err)console.error(err);
            if(rows[0]){
                return rows[0];
            }else {
                return false;
            }
        });
    }
    function AddPrefix(guild,args,con){
        con.query(`INSERT INTO prefix (guildID,prefix) VALUES ("${guild}","${args[0]}");`,(err)=>{
            if(err)return console.error(err);
        });
    }