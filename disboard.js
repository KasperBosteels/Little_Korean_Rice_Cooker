const fs = require('fs');
module.exports = {
	execute(con) {
		var data;
        con.query('SELECT guildID,channelID,time FROM disboard;',(err,rows)=>{
            if(err)console.error(err);
            data = JSON.stringify(rows)
            this.SAVE(data);
        });       
	},
    SAVE(data){
        fs.writeFileSync('./jsonFiles/disboard.json',data,(err)=>{
            if(err){
                return console.error(err);
            }
            console.log('disboard data saved');
        })
    },
    GET(guildID){
        let rawData =fs.readFileSync('./jsonFiles/disboard.json','utf-8');
        let file = JSON.parse(rawData);
        let DISObject = {
            guildID: guildID,
            channelID: null,
            time:null
        };
        for (let i = 0; i < file.length; i++) {
            
         if(file[i].guildID == guildID){
             DISObject.channelID = file[i].channelID;
             DISObject.guildID = file[i].guildID;
             DISObject.time = file[i].time;
             return DISObject;
            }
       }
       return false
    },
    async CONFIRM(client){
        let time = new Date();
        let hour = time.getHours();
        let data = getAll();
        data.forEach(guild => {
                client.channels.fetch(guild.channelID)
                .then((channel=>{
                    channel.send(`:satellite: Disboard alert!`);
                })).catch(console.error);
            });
    }
};

function getAll(){
    let rawData =fs.readFileSync('./jsonFiles/disboard.json','utf-8');
        let file = JSON.parse(rawData);
        return file;
}
