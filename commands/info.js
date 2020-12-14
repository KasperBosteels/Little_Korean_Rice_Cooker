//get files for display
const discord = require('discord.js');
const info = require('../package.json');
const prefix = require('../auth.json');
const database = require('../database.json');
module.exports = {
	name: 'info',
	description: 'gives general info about the bot',
	usage: ' ',
	execute(client, message, args,con) {
        var connection = ':x:'
            if(con.state == 'disconnected'){
                 con.connect(err =>{
                    if(err.code != 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE' || err.code != 'ECONNREFUSED' || err.code != 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {console.log(err);}else {connection = ':white_check_mark:';}
                    if(err.fatal = true){
                        if(reconnect())connection = ':x:';}
                });
            }else{
                connection = ':white_check_mark:';
            }
        return message.channel.send(makeEmbed(connection));
        
    },
};
function makeEmbed(connection){
    const messageembed = new discord.MessageEmbed()
    .setTitle(info.name)
    .setDescription(`version: ${info.version}`)
    .setColor(`#228B22`)
    .addField(`author:`,`${info.author}`)
    .addField('Contact',`Have any cool gifs ?,found a bug ?\n pls use "${prefix.prefix}message (your message)".`)
    .addField('Currency',`Currency is available for level 5 users, use "${prefix.prefix}level" to see your current level.`)
    .addField(`discordjs`,`${info.dependencies["discord.js"]}`,true)
    .addField(`dotenv`,`${info.dependencies["dotenv"]}`,true)
    .addField(`ms`,`${info.dependencies["ms"]}`,true)
    .addField(`mysql`,`${info.dependencies["mysql"]}`,true)
    .addField(`sql connection:`,`${connection}`,true)
    return messageembed;
}
function reconnect(){
    var con = mysql.createConnection({
        host: database.host,
        user : database.user,
        password: database.pwd,
        database: database.database
    });
    con.connect(err =>{
        if(!err)return true;
        return false;
    });
    

}