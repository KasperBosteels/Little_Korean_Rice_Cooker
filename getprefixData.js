const fs = require('fs');
module.exports = {
	execute(con) {
		var data;
        con.query('SELECT guildID,prefix FROM prefix;',(err,rows)=>{
            if(err)console.error(err);
            data = JSON.stringify(rows)
            this.SAVE(data);
        });       
	},
    SAVE(data){
        fs.writeFileSync('./jsonFiles/prefix.json',data,(err)=>{
            if(err){
                return console.error(err);
            }
        })
        console.log('prefix data saved');
    },
    GET(guildID){
        let rawData =fs.readFileSync('./jsonFiles/prefix.json','utf-8');
        let file = JSON.parse(rawData);
        let guildprefix;
        for (let i = 0; i < file.length; i++) {
         if(file[i].guildID == guildID){return guildprefix = file[i].prefix;}
       }
       return "-"
    }
};