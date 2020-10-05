const config = require('./auth.json');

module.exports = {
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);    
        client.user.setActivity(config.activity,{type: 'WATCHING'});

    }
}