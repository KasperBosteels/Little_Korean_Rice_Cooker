    
    module.exports = {
        name: 'kick',
        description: 'make am walk arrrr',
        execute(message, args) {
            if (!message.mentions.users.size) {
                return message.reply('you need to tag a user in order to make em walk the plank ARRRR');
            }
                // grab the "first" mentioned user from the message
    // this will return a `User` object, just like `message.author`
    // Easy way to get member object though mentions.
var member= message.mentions.members.first();
// Kick
member.kick().then((member) => {
// Successmessage
message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
}).catch(() => {
// Failmessage
message.channel.send("Access Denied");
});
        },
    };