module.exports = {
    name: 'mute',
    description: 'ahhh sweet silence',
    usage: '<@ user>',
    guildOnly: 'true',
    args : 'true',
    execute(message, args) {



        // Variables
    var muteRole = message.guild.roles.find(role => role.name.toLowerCase().includes("Muted"));
    var muteChannel = message.guild.channels.find(channel => channel.name.includes("bot-logs"));
    var muteUser = message.mentions.members.first();
    var muteReason = message.content.slice(prefix.length + 27);

// Conditions
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions");
if (!muteUser) return message.channel.send("You have to mention a valid member");
if (!muteChannel) return message.channel.send("There's no channel called modlogs");
if (!muteRole) return message.channel.send("There's no role called muted");
if (!message.guild.member(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("I Don't have permissions");
if (!muteReason) muteReason = "No reason given";

    var muteEmbed = new Discord.RichEmbed() 
    .setTitle("Mute")
    .addField("Muted user", muteUser)
    .addField("Reason", muteReason)
    .setFooter(`Muted by ${message.author.tag}`)
    .setTimestamp();

    //Mute
    muteUser.addRole(muteRole);
    message.channel.send(`${muteUser} has been muted`);
    muteChannel.send(muteEmbed);
          
    },
};