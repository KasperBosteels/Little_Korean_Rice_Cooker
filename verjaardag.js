const data = require('canvacord/src/Plugins');
const fs = require('fs');
module.exports = {
	execute(con) {
		var data;
        con.query('SELECT userID,maand,dag,channelID,guildID FROM verjaardagen;',(err,rows)=>{
            if(err)console.error(err);
            data = JSON.stringify(rows)
            this.SAVE(data);
        });       
	},
    SAVE(data){
        fs.writeFileSync('./jsonFiles/verjaardagen.json',data,(err)=>{
            if(err){
                return console.error(err);
            }
            console.log('DOB saved');
        })
    },
    GET(userID){
        let rawData =fs.readFileSync('./jsonFiles/verjaardagen.json','utf-8');
        let file = JSON.parse(rawData);
        let DOBobject = {
            userID: userID,
            maand: null,
            dag: null,
            channelID: null,
            guildID: null
        };
        for (let i = 0; i < file.length; i++) {
            
         if(file[i].userID == userID){
             DOBobject.maand = file[i].maand;
             DOBobject.dag = file[i].dag;
             DOBobject.channelID = file[i].channelID;
             DOBobject.guildID = file[i].guildID;
             return DOBobject;
            }
       }
       return false
    },
    async CONFIRM(client){
        let datum = new Date();
        let day = datum.getUTCDate();
        let month = datum.getUTCMonth()+1;
        let data = getAll();
        data.forEach(person => {
            if(person.dag == day && person.maand == month){
                var user = client.users.fetch(person.userID)
                .then((user)=>{
                console.log(user);
                client.channels.fetch(person.channelID)
                .then((channel=>{
                    channel.send(`A warm and happy birthday to ${user.username} :partying_face:`);
                })).catch(console.error);
            });
            }
        });
    }
};

/*
guild.members.fetch({ user, cache: false })
  .then(console.log)
  .catch(console.error);

guild.members.fetch('66564597481480192')
  .then(console.log)
  .catch(console.error);

*/


function getAll(){
    let rawData =fs.readFileSync('./jsonFiles/verjaardagen.json','utf-8');
        let file = JSON.parse(rawData);
        return file;
}
function MakeEmbed(user){

}