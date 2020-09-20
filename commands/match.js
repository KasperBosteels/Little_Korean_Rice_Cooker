const discord = require("discord.js");
const high ='https://i.imgur.com/9r74r3m.gif';
const med = 'https://i.imgur.com/WOCTtFu.gif';
const low = 'https://i.imgur.com/ByK1nCL.gif';
const lower = 'https://i.imgur.com/yAlP0u1.gif';
var chosen = " ";
//loading bar in here for use of other commands possible
module.exports = {
	name: 'matchmaker',
	description: 'to find true happines is to find lewd people online',
	cooldown: 1,
    usage: '<@user> or <@user> <@user> ',
    aliases:['mm','marry'],
	category: "fun",
	async execute(client,message, args) {
		/**
 * Create a text progress bar
 * @param {Number} value - The value to fill the bar
 * @param {Number} maxValue - The max value of the bar
 * @param {Number} size - The bar size (in letters)
 * @return {String} - The bar
 */
global.progressBar = (value, maxValue, size) => {
	const percentage = value / maxValue; // Calculate the percentage of the bar
	const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
	const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.
  
	const progressText = '❤'.repeat(progress); // Repeat is creating a string with progress * caracters in it
	const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
	const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar
  
	const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```'; // Creating the bar
	return bar;
  };
		let value = Math.floor((Math.random() * 100) + 1);
		var lovemeter = progressBar(value,100,25);
		var users = [];
		if(args[0]){
			for (let i = 0; i < args.length; i++) {
				users[i] = getUserFromMention(client,args[i])
			}
		}else{return message.channel.send("pls give me a match")}
		if(!args[1]){
			var percentage = value;
			if(percentage<=25)chosen = lower;
			if(percentage<=50 && percentage>25)chosen = low;
			if(percentage<=75 && percentage>50)chosen = med;
			if(percentage<=100 && percentage>75)chosen = high;

			
			var embed = new discord.MessageEmbed()
    .setColor('#fc0fc0')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**LOVE O' METER**\n
	${message.author}  :heart:  ${users[0]}\n
	**measured love**\n${lovemeter}`)
    .setImage(chosen)
}else{
	var percentage = value;
			if(percentage<=25)chosen = lower;
			if(percentage<=50 && percentage>25)chosen = low;
			if(percentage<=75 && percentage>50)chosen = med;
			if(percentage<=100 && percentage>75)chosen = high;
			var embed = new discord.MessageEmbed()
			.setColor('#fc0fc0')
			.setFooter(message.member.displayName,message.author.displayAvatarURL)
			.setTimestamp()
			.setDescription(`**LOVE O' METER**\n
			${users[0]}  :heart:  ${users[1]}\n
			**measured love**\n${lovemeter}`)
			.setImage(chosen)
		}
	
		message.channel.send(embed);
    },
};
function getUserFromMention(client,mention)
{if (!mention)return;
	if (mention.startsWith('<@') && mention.endsWith('>')){
		mention = mention.slice(2,-1);
		if (mention.startsWith('!')){
			mention = mention.slice(1);
		}
		return client.users.cache.get(mention);
	}
}
