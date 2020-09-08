const database = require("../database.json");
const mysql = require("mysql");

module.exports = {
	name: 'return data',
    description: 'should return data from dataserver\n',
    cooldown : 10,
    guildOnly: 'true',
    aliases: ['return','dtr'],
    usage:'optional: <user tag>/<role name>/<user tag> <role name>',
    
	execute(message, args) {
		var con = mysql.createConnection({
            host: database.host,
            user : database.user,
            password: database.pwd,
            database: database.database

        });
        con.connect(err =>{
            if(err) {
                console.log(err); 
                message.channel.send('dtb connection issue');
        } 
        });

        var user = message.guild.member(message.mentions.members.first());
        if (!args[0])user = message.author;
        var guildid = message.guild.id;
        var rolename = args[1];
        var output = [];
        if(!user && !rolename){
                con.query(`SELECT * FROM roles WHERE IDUser = '${message.author.id}' AND guild = '${guildid}';`,(err,rows,fields) =>{
                    rows.forEach(row => {
                        output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
                    });
                    message.channel.send(output);
                });

        }else if (user && !rolename){
                con.query(`SELECT * FROM roles WHERE IDUser = '${user.id}' AND guild = '${guildid}';`,(err,rows,fields) =>{
                    rows.forEach(row => {
                    output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
                });
                message.channel.send(output);});

        }else if (user && rolename ){
            var role = message.guild.roles.cache.find(role => role.name === rolename);
            con.query(`SELECT * FROM roles WHERE IDUser = '${user.id}' AND roles = '${role.id}';`,(err,rows,fields) =>{
                rows.forEach(row => {
                output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
            });
            message.channel.send(output);});
        }else if (!user && rolename ){
            rolename = args[0];
            var role = message.guild.roles.cache.find(role => role.name === rolename);
            con.query(`SELECT * FROM roles WHERE roles = '${role.id}';`,(err,rows,fields) =>{
                rows.forEach(row => {
                output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
            });
            message.channel.send(output);});
        }else {
            message.channel.reply('dont corrupt my data pls, whom ever u are');
        }
        con.end(err =>{if (err)console.log(err);
        });






	},
};