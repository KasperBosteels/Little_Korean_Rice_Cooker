const Discord = require("discord.js");
module.exports = {
	name: 'level',
	description: 'see the current level progression from a person',
	cooldown: 1,
	usage: '<optional: @user>',
	category: "General",
	execute(client,message, args,con) {
//#region bar
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
  
	const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
	const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
	const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar
  
	const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```'; // Creating the bar
	return bar;
  };

//#endregion
		var userID = message.author.id;
    con.query(`SELECT * FROM levels WHERE userID = "${userID}";`,(err,rows) =>{
        if(err)console.log(err);
        if(!rows.length){
        message.channel.send('sorry bud i didnt find that person');
        }else{
        con.query(`SELECT level ,exp FROM levels WHERE userID = "${userID}"`,(err,rows) =>{
           if(err)return console.log(err);
           var LEV = rows[0].level;
           var EXP = rows[0].exp;
           if(LEV == null || EXP == null)return console.log(`${LEV}\n${EXP}`);
           var nextlevel =(15 + 300)*(LEV * 2);
            var mem = message.guild.member(message.author);
            let progressbar = progressBar(EXP,nextlevel,30)
            //#region embed
            var embed = new Discord.MessageEmbed()
            .setColor('#006400')
            .setAuthor(`${mem.displayName}`,mem.user.avatarURL({dynamic: true,format: 'png',size:32}))
            .setDescription(`level: **${LEV}**\nexp: ${EXP}\nnext level: ${nextlevel}\n${progressbar}`)
            //#endregion
            try{
                message.channel.send(embed)
                }catch(err){console.log(err);} 
            
        });
    }});
	},
};