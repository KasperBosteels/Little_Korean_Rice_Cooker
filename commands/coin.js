
    module.exports = {
        name: 'coin',
        description: 'coinflip',
        cooldown: 1,
        aliases: ['flip','coinflip','cf'],
        usage: ' ',
        category: "fun",
        execute(client,message, args) {
            //randil 1 or 2
            let coin = Math.floor((Math.random() * 2) + 1);
            
            //if 1 = tails else ...
            if (coin <= 1){coin = 'tails';}else coin = 'heads';
            message.channel.send(`${coin}`);
        },
    };