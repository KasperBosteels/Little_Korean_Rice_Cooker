const ms = require('ms');

module.exports = {
    async execute(time,member,role,message){
        if (!time) return console.log('Not able to determine mutetime.');
        if (member.hasPermission("KICK_MEMBERS")) return

        //adds mute role to user
        member.roles.add(role.id);
        message.channel.send(`${member} has been muted for ${time}.`);
  
        //sets time out
        setTimeout(() => {
        if(member.roles.cache.has(role.id)){
            member.roles.remove(role.id);
            message.channel.send(`${member} has been unmuted.`)
            }
        }, 
     ms(time));
    }
}