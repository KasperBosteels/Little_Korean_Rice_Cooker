
module.exports = {
	name: 'purge',
    description: 'delete messages',
    args: 'true',
    usage:'<number to delete>',
    aliases: ['delete','remove'],
    category: "moderating",
	execute(client,message, args) {
        //check parms
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm2 Denied');

        //get amount to delete
        const amount = parseInt(args[0])+ 1;

        //if no args given or if hte number is between 1 and 100
    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid option.');
    }else if (amount <= 1 || amount >= 100) {
        return message.reply('you need to input a number between 1 and 99.');
    }
    //delete messages
    message.channel.bulkDelete(amount,true);

	},
};