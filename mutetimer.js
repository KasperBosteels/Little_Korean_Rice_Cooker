const ms = require('ms');

module.exports = {
    async execute(time,member,role,message){
        if (!time) return console.log('not able to determine mutetime');

        //adds mute role to user
        member.roles.add(role.id);
        message.channel.send(`${member} has been muted for ${time}`);
  
        //sets time out
        setTimeout(() => {
            member.roles.remove(role.id);
        message.channel.send(`${member} has been unmuted`)
        }, 
     ms(time));
    }
}