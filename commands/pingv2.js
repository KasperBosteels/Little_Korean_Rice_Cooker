const discord = require('discord.js');
module.exports = {
	name: 'ping',
    description: 'Gives you latency of the bot.',
	cooldown : 5,
	category: "config",
	usage: ' ',
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
		sent.edit(makeEmbed(sent.createdTimestamp - message.createdTimestamp,client.ws.ping,uptimeGET(client)));
		//sent.edit(`roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp} ms \n websocket heartbeat: ${client.ws.ping} ms\n${uptimeGET(client)}`);
	});
	return;
	},
};
 function uptimeGET(client){
	 let totalSeconds = (client.uptime/ 1000);
	 let days = Math.floor(totalSeconds / 86400);
	 totalSeconds%=86400;
	 let hours = Math.floor(totalSeconds/3600);
	 totalSeconds %=3600;
	 let totalminutes = Math.floor(totalSeconds/60);
	 let seconds = Math.floor(totalSeconds%60);
	 return `${days}:${hours}:${totalminutes}:${seconds}`;

 }
 function makeEmbed(roundtrip,heartbeat,uptime){
	let embed = new discord.MessageEmbed()
	.setTitle('**PING**')
	.addField('*roundtrip latency:*',`\`\`\` ${roundtrip} ms \`\`\``)
	.addField('*websocket heartbeat:*',`\`\`\` ${heartbeat} ms \`\`\``)
	.addField('*uptime:*',`\`\`\` ${uptime} \`\`\``);
	return embed;
 }