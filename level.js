const sqlconnect = require('./sql_serverconnection.js');
module.exports = {
	
	execute(message,con,Discord) {
		var randomint = Math.floor((Math.random()*15)+1);
    var userID = message.author.id;
    con.query(`SELECT * FROM levels WHERE userID = "${userID}";`,(err,rows) =>{
        if(err)console.log(err);
        if(!rows.length){
        con.query(`INSERT INTO levels (userID,level,exp,username) VALUES ("${userID}",1,0,"${message.author.tag}")`);
        }else{
        con.query(`SELECT level ,exp FROM levels WHERE userID = "${userID}"`,(err,rows) =>{
           if(err)return console.log(err);
           var LEV = rows[0].level;
           var EXP = rows[0].exp+randomint;
           if(LEV == null || EXP == null)return console.log(`${LEV}\n${EXP}`);
           var nextlevel =(15 + 300)*LEV;
           if(EXP >= nextlevel){LEV++;
            console.log(`${message.author} exp to next: ${nextlevel}`);
            var mem = message.guild.member(message.author)
            //#region embed
            var embed = new Discord.MessageEmbed()
            .setColor('#006400')
            .setTitle(':partying_face: level up :partying_face:')
            .setTimestamp()
            .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
            .setImage("https://i.imgur.com/Uyw52SY.gif")
            .setDescription(`YEAH!! ${mem.displayName} reached level ${LEV}\nTO THE STARS AND BEYOND!!`);
            //#endregion
            try{
                sqlconnect.execute(con,mem,6,embed,message);
                }catch(err){console.log(err);} 
            }
           con.query(`UPDATE levels SET level = "${LEV}", exp = "0" WHERE userID = "${userID}"`)
        });
    }});
    
	},
};