const database = require("../database.json");
const mysql = require("mysql");
module.exports = {
	name: 'dtb test',
    description: 'debug for sql server',
    cooldown : 10,
    args: 'true',
    guildOnly: 'true',
    aliases: ['data','dt'],
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

        var user = message.guild.member(message.mentions.members.first());
        var rolename = args[1];
        var remove = args [2];
        var guildid = message.guild.id;
        console.log(guildid);
        if(rolename){
            var roleinfo = message.guild.roles.cache.find(r => r.name == rolename);
            if (!rolename) return console.log('role doesnt exist');
            var roleID = roleinfo.id;
        }
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


        }else {
            message.channel.send("gebruik het command als volgt: !role gebruikernaam rolenaam verwijderen");
        }







	},
};