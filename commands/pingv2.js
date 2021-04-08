module.exports = {
	name: 'ping',
    description: 'Gives you latency of the bot.',
	cooldown : 100,
	category: "debug",
	aliases: ["ching"],
	async execute(client,message, args,con) {
		if(message.content == "-ching"){
			con.query(`INSERT INTO ching (guildID) VALUES("${message.guild.id}");`);
			con.query(`SELECT EXISTS(SELECT * FROM ching WHERE guildID = "${message.guild.id}")AS exist;`,(err,rows) =>{
				if(err)return console.log(err);
				if(rows[0].exist != 0){
					con.query(`SELECT COUNT(*) AS number FROM ching where guildID = '${message.guild.id}';`,(err,rows,fields) => {amount = rows[0].number
						
						if(amount >= 10){
							con.query(`DELETE FROM ching WHERE guildID = "${message.guild.id}";`);
							message.channel.send("https://www.youtube.com/watch?v=oQYAETMEnc8");
						}else{
							 message.channel.send('ping...').then(sent =>{
								 sent.edit(`roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp} ms\nwebsocket heartbeat: ' ${client.ws.ping} ms`);
							 });
						}


						 });
				}
			});
			return;
		}
		//get current time and message recieved timestamp subtract and send back 
	 message.channel.send('ping...').then(sent =>{
		sent.edit(`roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp} ms \n websocket heartbeat: ${client.ws.ping} ms`);
	});
	return;
	},
};
 