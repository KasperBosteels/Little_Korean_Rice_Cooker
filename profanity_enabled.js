const fs = require('fs');
module.exports = {
	execute(con) {
		var data;
        con.query('SELECT guildID,filtered FROM profanity_enabled;',(err,rows)=>{
            if(err)console.error(err);
            data = JSON.stringify(rows)
            this.SAVE(data);
        });       
	},
    SAVE(data){
        fs.writeFileSync('./jsonFiles/profanity_enabled.json',data,(err)=>{
            if(err){
                return console.error(err);
            }
        })
        console.log('profanity_filter_enabler data saved');

    },
    GET(guildID){
        let rawData =fs.readFileSync('./jsonFiles/profanity_enabled.json','utf-8');
        let file = JSON.parse(rawData);
        for (let i = 0; i < file.length; i++) {
    
         if(file[i].guildID == guildID){
             if(file[i].filtered == 1)return true;
            }
       }
       return false
    },
};

function getAll(){
    let rawData =fs.readFileSync('./jsonFiles/disboard.json','utf-8');
        let file = JSON.parse(rawData);
        return file;
}