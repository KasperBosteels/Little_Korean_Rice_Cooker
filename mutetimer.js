const ms = require('ms');

module.exports = {
    async execute(time,member,role){
        if (!time) return console.log('not able to determine mutetime');

        //adds mute role to user
        member.roles.add(role.id);
        message.channel.send(`${member} has been muted for ${muteTime}`);
  
        //sets time out
        setTimeout(() => {
            member.roles.remove(role.id);
        message.channel.send(`${member} has been unmuted`)
        }, 
     ms(muteTime));
    }
}