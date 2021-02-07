const config = require('./auth.json');
const fs = require('fs');
module.exports = {
    execute(message){
        return check(message)
    }
};
function check(message) {
   var guildprefix
   let rawData = fs.readFileSync('./jsonFiles/prefix.json','utf-8');
   let file = JSON.parse(rawData);
   for (let i = 0; i < file.length; i++) {
       if(file[i].guildID == message.guild.id) guildprefix = file[i].prefix;
   }
    if(guildprefix == null)
    {
        if(!message.content.startsWith(config.prefix)) {return false;}else return true;

    }else {
        if(message.content.startsWith(guildprefix))return true;
    }
}