module.exports = {
	name: 'lock',
	description: 'catnip',
	cooldown: 1,
	usage: ' ',
	category: "moderating",
	async execute(client,message, args,con) {
        if(!PermissionCheck(message))return;
        let everyone = message.guild.roles.cache.find(r =>r.name == "@everyone").id;
        if(!Lock(message.channel,everyone))return messag.channel.reply('There was an error.');
	},
};
async function Lock(channel,everyoneID){
    channel.send('Locking this channel...');
    await channel.overwritePermissions(
        [
            {
                id: everyoneID,
                deny: ['SEND_MESSAGES']
            }
        ]).catch((err)=>{
            if(err)console.error(err);
            return false;
        })
        return true;
}
function PermissionCheck(message){
    if (!message.member.hasPermission("BAN_MEMBERS")){
        message.reply('Permission Denied.');
     return false;
    }
     if (!message.guild.me.hasPermission("MANAGE_CHANNELS")){
        message.reply('I do not have the Permission to manage channels.'); 
        return false;
     }
return true;
}