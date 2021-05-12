const verjaardag = require('../verjaardag');
module.exports = {
	name: 'Birthday',
	description: 'set a birthday for users to celebrate',
	cooldown: 1,
	usage: '<@user> dd/mm/yy (to remove <@user> remove)',
	category: "fun",
    aliases: ['bd'],
	execute(client,message, args,con) {
        let user = getUserFromMention(args[0],client);
	    let channelID = message.channel.id;
        let guildID = message.guild.id;
        
        if (!user) {
		    return message.reply('Please use a proper mention.');
        }
        if(!channelID && !guildID) return message.reply("something went badly.");
        if(!args[1]){
        
            return message.reply('You need to give me a date (DD/MM/YYYY) or "remove".');
        }
        let data = verjaardag.GET(user.id);

        if(!regexTest(args[1].split('/').reverse().join('/')) && args[1] != "remove"){
            return message.reply('DD/MM/YYYY is the right format.');
        }
        if(args[1] == "remove"){
            if(data == false)return message.channel.send('I have no birthday date of this person.');
            if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id != user.id){ 
                return message.channel.send("Only moderators and the people this data is form are allowed to delete it.");
            }

            con.query(`DELETE FROM verjaardagen WHERE userID = '${user.id}';`,(err) =>{
                if(err){
                    console.error(err);
                    return message.channel.send('An error occurred, try again later.');
                }

            }
            );
            verjaardag.execute(con);
            return message.reply('removed the birthday');
        }
        if(regexTest(args[1].split('/').reverse().join('/'))){
            
            if(data != false) {
                return message.reply('This users birthday is already set, please remove it first.');
            }

            let userdate = args[1].split('/');
            let day = userdate[0];
            let month = userdate[1];

            con.query(`INSERT INTO verjaardagen (userID,maand,dag,channelID,guildID) VALUES("${user.id}",${month},${day},"${channelID}","${guildID}")`,(err)=>{
            if(err){
                console.log(err);
                return message.channel.send('An error occurred, try again later.');
            }
            verjaardag.execute(con);
            });


            verjaardag.execute(con);

            return message.channel.send('Its saved.');
        }

    },
};
//advanced identifier for user to not ban the wrong person
function getUserFromMention(mention,client) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
        mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
        }
    }
    function regexTest (datum){
        let RE = new RegExp('((?:19|20)[0-9][0-9])/(0?[1-9]|1[012])/(0?[1-9]|[12][0-9]|3[01])');
        if(RE.test(datum)){
            console.log(datum, '<= valid date');
            return true;
        }else{
            console.log(datum, '<= invalid date');
            return false;
        }
    }
/*
    function checkDatabase(userID,Database){
        for (let i = 0; i < Database.length; i++) {
            if(Database.userID == userID)return true;
        }
        return false;
    }
*/