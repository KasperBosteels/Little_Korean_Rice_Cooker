const discord = require("discord.js");
const gif = require("../jsonFiles/bodily_affection.json");
var chosen = " ";
var value = 0;
var users = [];
var lovemeter;
//loading bar in here for use of other commands possible
module.exports = {
	name: 'matchmaker',
	description: 'to find true happines is to find lewd people online',
	cooldown: 1,
    usage: '<@user> or <@user> <@user> ',
    aliases:['mm','marry','match'],
	category: "fun",
	async execute(client,message, args) {
		if (!args[0]) return message.channel.send(`pls give me a match\n if you dont know how to use this command try "-help matchmaker"`);
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

		value = Math.floor((Math.random() * 100) + 1);
		//#region ott's, afterhours and iced's request 
		if(!args[1]&&message.author == message.mentions.users.first()){value = 0;}
		if (!args[1] && message.author.id == "284553236864827392") {if (value > 75) value = value /2;}
		if(message.author.id == "550024839063404559"){value = 100;}
		//#endregion
		 
		if(args[0]){
			for (let i = 0; i < args.length; i++) {
				users[i] = getUserFromMention(client,args[i])
			}
			if (users[1]&&users[0] == users[1]) {
				value = 0;
			}
			for (let o = 0; o < users.length; o++) {
				if(users[o].id == "284553236864827392"){if(value > 75)value = value /2;}
			}

		}
		lovemeter = progressBar(value,100,25);
		if(!args[1]){
			chosen = getGif(value);
			var embed = new discord.MessageEmbed()
    .setColor('#fc0fc0')
    .setFooter(message.member.displayName,message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**LOVE O' METER**\n
	${message.author}  :heart:  ${users[0]}\n
	**measured love**\n${lovemeter}`)
    .setImage(chosen)
}else{
			chosen = getGif(value);
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
function getGif(value){
	var percent = value;
	if (percent<1)return gif.zero[Math.floor(Math.random() * Math.random(gif.zero.length))];
	if(percent<=25 && percent>1)return gif.lower[Math.floor(Math.random() * Math.floor(gif.lower.length))];
	if(percent<=50 && percent>25)return gif.low[Math.floor(Math.random() * Math.floor(gif.low.length))];
	if(percent<=75 && percent>50)return gif.med[Math.floor(Math.random() * Math.floor(gif.med.length))];
	if(percent<100 && percent>75)return gif.high[Math.floor(Math.random() * Math.floor(gif.high.length))];
	if (percent > 99)return gif.max[Math.floor(Math.random() * Math.floor(gif.max.length))];
}
