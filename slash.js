module.exports = {
	execute(client) {
        return ping(client);
    },
};
function ping(client){
    client.api.applications(client.user.id).guilds('800428425671081984').commands.post({data:{
        name: 'ping',
        description: 'ping pong'
    }})
}