module.exports = {
    async execute(con,member,functie,embed,message){
        switch (functie) {
            case 1:
                logget(con,member,functie);
                break;
            case 2:
                logget(con,member,functie);
                break;
                case 3:
                endconnect(con);
                break;
            case 4:
                sqlconnect(con);
                break;
            case 5:
                embedlog(con,member,embed,message);
                break;
            case 6:
                embedless(con,member,embed,message)
                break;

        }
    },
    
};
function sqlconnect(con) {
    con.connect(err =>{if (err)
        return console.log(err);});

}

 function embedlog(con,member,embed,message){
    //#region looks for bot-log channel
    con.query(`SELECT EXISTS(SELECT log_channel FROM guild WHERE guildID = "${member.guild.id}")AS exist;`,(err,rows) =>{	
       let logchannel;
       if(err)console.log(err);	
       if(rows[0].exist != null){	
        con.query(`SELECT log_channel AS channel FROM guild WHERE guildID = '${member.guild.id}';`,(err,rows) =>{	
            if(err) return console.log(err);	
            logchannel = member.guild.channels.cache.get(rows[0].channel);	
            logchannel.send({embeds:[embed]}); 	
        });	
    }else{	
        let lognames = ["bot-logs","bot-log","log","botlog"];	
        for (let u = 0; u < lognames.length; u++) {	
            logchannel = member.guild.channels.cache.find(chan => chan.name === lognames[u]);
            if (logchannel) {	
                break;	
            }	
        }	
        if (!logchannel) {
            if(message)message.channel.send({embeds:[embed]});	
            return;
        }else{  logchannel.send({embeds:[embed]}); 	
        }}	
    });	
}
function embedless(con,member,embed,message){
    con.query(`SELECT EXISTS(SELECT log_channel FROM guild WHERE guildID = "${message.guild.id}")AS exist;`,(err,rows) =>{	
        let logchannel;
        if(err)console.log(err);	
        if(rows[0].exist != null){	
         con.query(`SELECT log_channel AS channel FROM guild WHERE guildID = '${message.guild.id}';`,(err,rows) =>{	
            if(err) return console.log(err);	
             logchannel = message.guild.channels.cache.get(rows[0].channel);	
             logchannel.send({embeds:[embed]});
    });	
    }else{
        var lognames = ["bot-logs","bot-log","log","botlog"];
        for (let u = 0; u < lognames.length; u++) {
             logchannel = message.guild.channels.cache.find(chan => chan.name === lognames[u]);
            if (logchannel) {
                break;
            }
          }
        // Do nothing if the channel wasn't found on this server
        if (!logchannel) {message.channel.send({embeds:[embed]});
      }else{  logchannel.send({embeds:[embed]}); 
      }}
    });	

}
//get log channel and send welcome or leave message
function logget(con,member,happening) {
    con.query(`SELECT EXISTS(SELECT log_channel FROM guild WHERE guildID = "${member.guild.id}")AS exist;`,(err,rows) =>{
        var logchannel;
        if(err)console.log(err);
        if(rows[0].exist != 0){
            con.query(`SELECT log_channel AS channel FROM guild WHERE guildID = '${member.guild.id}';`,(err,rows) =>{
                if (err)return console.log(err);
                logchannel = member.guild.channels.cache.get(rows[0].channel);
                if (happening == 1) {
                    logchannel.send({content:`ohno ${member.user.tag} left us ;_;`});
                    console.log(`member left:  ${member.user.tag}\n`);    
                }else if(happening == 2){
                    logchannel.send({content:`${member.user.tag} joined us hooray !!`});
                    console.log(`new member joined:     ${member.user.tag}\n`);
                }
               
            });
        }else{
            var lognames = ["bot-logs","bot-log","log","botllog"];
            for (let u = 0; u < lognames.length; u++) {
                 logchannel = member.guild.channels.cache.find(chan => chan.name === lognames[u]);
                 if (logchannel) {
                    break;
                }
              }
            // Do nothing if the channel wasn't found on this server
            if (!logchannel) {console.log('no action taken no channel found');
        }else{if (happening == 1) {
            logchannel.send({content:` goodbye, ${member.username} :cry:`}); 
            console.log(`member left:  ${member.user.tag}\n`);   
        }else if(happening == 2){
            logchannel.send({content:`Welcome to the server, ${member.username}`}); 
            console.log(`new member joined:     ${member.user.tag}\n`);
        }
    }}
        });
}
function endconnect(con, member){
    con.end(err =>{if (err)return console.log(err);});
}
function searchLogData(con,member){
    con.query(`SELECT EXISTS(SELECT log_channel FROM guild WHERE guildID = "${member.guild.id}")AS exist;`,(err,rows) =>{	
        let logchannel;
        if(err)console.log(err);	
            if(rows[0].exist != 0){	
                con.query(`SELECT log_channel AS channel FROM guild WHERE guildID = '${member.guild.id}';`,(err,rows) =>{	
                    if(err) return console.log(err);	
                        logchannel = member.guild.channels.cache.get(rows[0].channel);	
                        return logchannel;
                    });	
            }
    });
}