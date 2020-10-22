
module.exports = {
    execute(con,functie,member){
        console.log("member left");
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

        }
    }
};
function sqlconnect(con) {
    con.connect(err =>{if (err)return console.log(err);});

}


//get log channel and send welcome or leave message
function logget(con,member,happening) {
    sqlconnect(con);
    console.log("got to connect");
    con.query(`SELECT EXISTS(SELECT * FROM logchannel WHERE guildID = "${member.guild.id}")AS exist;`,(err,rows) =>{
        var logchannel;
        if(err)console.log(err);
        if(rows[0].exist != 0){
            con.query(`SELECT channelID AS channel FROM logchannel WHERE guildID = '${member.guild.id}';`,(err,rows) =>{
                logchannel = member.guild.channels.cache.get(rows[0].channel);
                if (happening == 1) {
                    logchannel.send(`ohno ${member.user.tag} left us ;_;`);
                    console.log(`member left:  ${member.user.tag}\n`);    
                }else if(happening == 2){
                    logchannel.send(`${member.user.tag} joined us hooray !!`);
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
            logchannel.send(` goodbye, ${member.username} :cry:`); 
            console.log(`member left:  ${member.user.tag}\n`);   
        }else if(happening == 2){
            logchannel.send(`Welcome to the server, ${member.username}`); 
            console.log(`new member joined:     ${member.user.tag}\n`);
        }
    }}
        });
        endconnect(con);
}
function endconnect(con){
    con.end(err =>{if (err)return console.log(err);});
}