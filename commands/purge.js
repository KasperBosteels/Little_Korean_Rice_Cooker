
module.exports = {
	name: 'purge',
    description: 'delete messages',
    args: 'true',
    usage:'<number to delete>',
    aliases: ['delete','remove'],
	execute(message, args) {
		const amount = parseInt(args[0])+ 1;

    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
    }else if (amount <= 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    }
    message.channel.bulkDelete(amount,true);
	},
};