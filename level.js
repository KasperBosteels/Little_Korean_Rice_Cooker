const sqlconnect = require('./sql_serverconnection.js');
module.exports = {
	
	execute(message,con,Discord) {
		var randomint = Math.floor((Math.random()*15)+1);
    var userID = message.author.id;
    con.query(`SELECT * FROM levels WHERE userID = "${userID}";`,(err,rows) =>{
        if(err)console.log(err);
        if(!rows.length){
        con.query(`INSERT INTO levels (userID,level,exp) VALUES ("${userID}",1,0)`);
        }else{
        con.query(`SELECT level ,exp FROM levels WHERE userID = "${userID}"`,(err,rows) =>{
           if(err)return console.log(err);
           var LEV = rows[0].level;
           var EXP = rows[0].exp+randomint;
           if(LEV == null || EXP == null)return console.log(`${LEV}\n${EXP}`);
           var nextlevel =(15 + 300)*(LEV * 2);
           if(EXP >= nextlevel){
            LEV++;
            EXP = 0;
            var mem = message.guild.member(message.author);
            console.log(`${mem.displayName} exp to next: ${nextlevel}`);
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
                con.query(`UPDATE levels SET level = ${LEV}, exp = 0 WHERE userID = "${userID}"`,(err)=>{
                if(err)console.log(err);
                });
                }catch(err){console.log(err);} 
            }
            con.query(`UPDATE levels SET level = ${LEV}, exp = ${EXP} WHERE userID = "${userID}"`)
            if(LEV == 5){con.query(`INSERT INTO currency (userID,ballance) values ("${message.author.id}",100)`,(err)=>{if(err)throw(err);});
        }else if(LEV > 5){con.query(`UPDATE currency SET ballance = ballance + 100 WHERE userID = "${message.channel.id}"`,(err)=>{if(err)throw(err);});}
        });
    }});
    
	},
};747873253619531898