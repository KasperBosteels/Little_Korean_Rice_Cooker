const fs = require('fs');
module.exports = {
   async execute(message){

       if(message.author.id != '258217948819357697' && message.author.id != "256696952626872321")return;
       if(message.content.includes("*forbid")){
        let content = message.content.split(" "); 
        await this.SAVE(content[1]);
        return
    }else{
        return;
    }
   },
   SAVE(userID){
    fs.writeFileSync('./jsonFiles/illegalusers.json',userID,(err)=>{
        if(err){
            return console.error(err);
        }
    })
    console.log('illegal users data saved');
    },
    GET(userID){
        let rawdata=fs.readFileSync('./jsonFiles/illegalusers.json','utf-8');
        let f = JSON.parse(rawdata);
        let found = false;
        for (let i = 0; i < file.length; i++) {
             if(file[i].userID == userID)found = true;
        }
        return found;
    }
};