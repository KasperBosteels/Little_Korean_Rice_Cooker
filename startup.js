const config = require('./auth.json');
module.exports = {
    execute(client,con) {
        client.user.setActivity(config.activity,{type: 'WATCHING'});
        con.connect();
        console.log(`Logged in as ${client.user.tag}!`);    
        
    }
}