module.exports = {
    name: 'mute',
    description: 'ahhh sweet silence',
    usage: '<@ user>',
    guildOnly: 'true',
    args : 'true',
    async execute(message, args) {
// get the user from the required args object
const userToMute = message.guild.members.find('id', args.user.id);
    
// find the name of a role called Muted in the guild that the message
// was sent from
const muteRole = message.guild.roles.find("name", "Muted");

// add that role to the user that should be muted
userToMute.addRole(muteRole);

// the time it takes for the mute to be removed
// in miliseconds
const MUTE_TIME = 60 * 1000;

// wait MUTE_TIME miliseconds and then remove the role
setTimeout(() => {
    userToMute.removeRole(muteRole);
}, MUTE_TIME);

message.channel.send(`*${message.author.username} forcechockes ${userToMute.user.username} for ${MUTE_TIME / 60} seconds*`, { file: 'url/path' });
return;


    },
};