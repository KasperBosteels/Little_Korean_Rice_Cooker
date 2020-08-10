module.exports = {
    name: 'mute',
    description: 'ahhh sweet silence',
    usage: '<@ user>',
    guildOnly: 'true',
    args : 'true',
    execute(message, args) {



        // Variables
    var muteRole = msg.guild.roles.find(role => role.name.toLowerCase().includes("Muted"));
    var muteChannel = msg.guild.channels.find(channel => channel.name.includes("bot-logs"));
    var muteUser = msg.mentions.members.first();
    var muteReason = msg.content.slice(prefix.length + 27);

// Conditions
if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You don't have the permissions");
if (!muteUser) return msg.channel.send("You have to mention a valid member");
if (!muteChannel) return msg.channel.send("There's no channel called modlogs");
if (!muteRole) return msg.channel.send("There's no role called muted");
if (!msg.guild.member(client.user.id).hasPermission("MANAGE_ROLES")) return msg.channel.send("I Don't have permissions");
if (!muteReason) muteReason = "No reason given";

    var muteEmbed = new Discord.RichEmbed() 
    .setTitle("Mute")
    .addField("Muted user", muteUser)
    .addField("Reason", muteReason)
    .setFooter(`Muted by ${msg.author.tag}`)
    .setTimestamp();

    //Mute
    muteUser.addRole(muteRole);
    msg.channel.send(`${muteUser} has been muted`);
    muteChannel.send(muteEmbed);
          
    },
};