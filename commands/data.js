
const sqlcon = require("../sql_serverconnection");
// DOTO:
//data removal 
//think of something to add to no role given if part
module.exports = {
	name: 'data',
    description: 'debug for sql server (inserts IDuser, IDrole and IDguild into database)(only usable by devs)',
    cooldown : 10,
    args: 'true',
    guildOnly: 'true',
    aliases: ['data','dt'],
    usage: '<user tag> <role name>',
    category: "debug",
    execute(client,message, args,con) {
        if(!message.author.id=="258217948819357697")return;

       
        //assing args to variables
        var user = message.guild.member(message.mentions.members.first());
        var rolename = args[1];
        var remove = args [2];
        var guildid = message.guild.id;

        //if role exists get info about it
        if(rolename){
            var roleinfo = message.guild.roles.cache.find(r => r.name == rolename);
            if (!roleinfo) return message.channel.send('role not found check spelling');
            var roleID = roleinfo.id;
        }
        sqlcon.execute(con,'user',4);
        if(user && !rolename){
        }else if (user && rolename && !remove){
                con.query(`SELECT * FROM roles WHERE IDUser = '${user.id}' AND roles = '${roleID}' AND guild = '${guildid}'`,(err,rows) =>{

                if (err)console.log(err);
                if(rows.length > 0){
                    return message.channel.send('deze gebruiker heeft deze rol al ')
                }else {
                    con.query(`INSERT INTO roles (IDUSER, roles, guild) VALUES ("${user.id}","${roleID}",${guildid})`);
                    user.roles.add(roleID);
                        return message.channel.send('role added to data')
                }


            });
        
        }else if (user && rolename && remove == "yes"){

            //////////////////////////////////////////////////////////////////////////TODO//////////////////////////////////////////////////////////////////////////////////
        }else {
            message.channel.send("gebruik het command als volgt: !role gebruikernaam rolenaam verwijderen");
        }


        
     




	},
};