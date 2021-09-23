const ms = require('ms');

module.exports = {
    async execute(time,member,role,message){
        if (!time) return console.log({content:'Not able to determine mutetime.'});
        if (member.hasPermission("KICK_MEMBERS")) return message.reply({content:'This person is possibly a moderator and cannot be muted.'});

        //adds mute role to user
        member.roles.add(role.id);
        message.channel.send({content:`${member} has been muted for ${time}.`});
  
        //sets time out
        setTimeout(() => {
        if(member.roles.cache.has(role.id)){
            member.roles.remove(role.id);
            message.channel.send({content:`${member} has been unmuted.`})
            }
        }, 
     ms(time));
    }
}