const Discord = require("discord.js");
const cavacord = require('canvacord');
module.exports = {
	name: 'level',
	description: 'see the current level, rank and progression from a user',
	cooldown: 1,
	usage: '<optional: @user>',
    category: "General",
    aliases: ["rank"],
	 execute(client,message, args,con) {
        var member = getID(message,args,client);
        let ID = member.id
    con.query(`SELECT * FROM levels WHERE userID = "${ID}";`,(err,rows) =>{
        if(err)console.log(err);
        if(!rows.length){
        return message.channel.send('sorry bud, i didnt find that person');
        }else{
            
            con.query(`SELECT s.level,s.exp,s.number FROM ( SELECT userID,level,exp,(@ROW_NUMBER:=@ROW_NUMBER + 1 ) AS number FROM levels, (SELECT @ROW_NUMBER := 0) init_variable ORDER BY level DESC) AS s WHERE userID = "${ID}";`,(err,rows) =>{
                //con.query(`SELECT level, exp, ( @ROW_NUMBER:=@ROW_NUMBER + 1 ) AS number FROM levels, (SELECT @ROW_NUMBER := 0) init_variable WHERE userID = "${ID}" ORDER BY level DESC`,(err,rows) =>{
                if(err){console.log(err);}
           var LEV = rows[0].level;
           var EXP = rows[0].exp;
           var rank = rows[0].number;
           if(LEV == null || EXP == null)return console.log(`${LEV}\n${EXP}`);
            var nextlevel =(15 + 300)*LEV;
            try{
                makeCard(LEV,EXP,nextlevel,rank,member,message);
                }catch(err){console.log(err);} 
            
        });
    }});
    },
   
};
function getID(message,args,client){
    let member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username.toLowerCase() == args.join(" ").toLowerCase()) || 
         client.users.cache.find(user => user.tag.toLowerCase() == args.join(" ").toLowerCase()));

         if(!member) member = message.member;

    return member;
}
function makeCard(lev,exp,nextlevel,rank,mem,message){
    const card = new cavacord.Rank()
    
    .setAvatar(mem.user.displayAvatarURL({dynamic: false, format: 'png'}))
    .setCurrentXP(exp)
    .setLevel(lev)
    .setRank(rank)
    .setRequiredXP(nextlevel)
    .setStatus(mem.user.presence.status)
    .setProgressBar("#149414",'COLOR')
    .setUsername(mem.user.username)
    .setDiscriminator(mem.user.discriminator);
    card.build().then(data => {
        const attachment = new Discord.MessageAttachment(data, "rankcard.png");
        sendCard(attachment,message)
    });
    return;
}
function sendCard(card,message){
return message.channel.send(card);
}