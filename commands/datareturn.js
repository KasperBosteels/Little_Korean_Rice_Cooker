const sqlcon = require("../sql_serverconnection.js");
module.exports = {
	name: 'return data',
    description: 'should return data from dataserver',
    cooldown : 10,
    guildOnly: 'true',
    aliases: ['return','dtr'],
    usage:'optional: <user tag>/<role name>/<user tag> <role name>(only usable by devs)',
    category: "debug",
    
	execute(client,message, args,con) {
        if(!message.author.id=="258217948819357697")return;

        
        //check if mentioned if not variable user becomes author
        var user = message.guild.member(message.mentions.members.first());
        if (!args[0])user = message.author;

        //assign variables
        var guildid = message.guild.id;
        var rolename = args[1];
        var output = [];
        //if no arguments are given return author all 
        if(!user && !rolename){
                con.query(`SELECT * FROM roles WHERE IDUser = '${message.author.id}' AND guild = '${guildid}';`,(err,rows,fields) =>{
                    rows.forEach(row => {
                        output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
                    });
                    message.channel.send(output);
                });

                //if person mentioned give his data
        }else if (user && !rolename){
                con.query(`SELECT * FROM roles WHERE IDUser = '${user.id}' AND guild = '${guildid}';`,(err,rows,fields) =>{
                    rows.forEach(row => {
                    output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
                });
                message.channel.send(output);});

                //if person is mention and a role give this persons specific role data
        }else if (user && rolename ){
            var role = message.guild.roles.cache.find(role => role.name === rolename);
            con.query(`SELECT * FROM roles WHERE IDUser = '${user.id}' AND roles = '${role.id}';`,(err,rows,fields) =>{
                rows.forEach(row => {
                output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
            });
            message.channel.send(output);});

            //if no person mentioned but role given then give users with this role
        }else if (!user && rolename ){
            rolename = args[0];
            var role = message.guild.roles.cache.find(role => role.name === rolename);
            con.query(`SELECT * FROM roles WHERE roles = '${role.id}';`,(err,rows,fields) =>{
                if(!rows)return message.channel.send('MySQL has failed');
                rows.forEach(row => {
                output +=`${row.ID}     ${row.IDUser}     ${row.roles}    ${row.guild}\n`;
            });
            message.channel.send(output);});

            //person did it badly
        }else {
            message.channel.reply('dont corrupt my data pls, whom ever u are');
        }
        






	},
};