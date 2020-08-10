
    module.exports = {
        name: 'coin',
        description: 'coinflip',
        execute(message, args) {
            let coin = Math.floor((Math.random() * 2) + 1);
            if (coin <= 1){coin = 'tails';}else coin = 'heads';
            return message.channel.send(`${coin}`);
        },
    };