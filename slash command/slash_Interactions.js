const ox = require("oxford-dictionary");
const ID = process.env.OXFORD_ID;
const KEY = process.env.OXFORD_KEY;
const config={app_id : ID,app_key: KEY,source_lang:"en-gb"};
const dict = new ox(config);
module.exports = {
    execute(client){
        client.ws.on('INTERACTION_CREATE',async interactie =>{
            const args = interactie.data.options;
            const command = interactie.data.name.toLowerCase();
            if(command == 'test'){
                client.api.interactions(interactie.id,interactie.token).callback.post(
                    {
                        data:{
                            type:4,
                            data: "test"
                        }
                });            
            }
            if(command == 'oxford'){
                var definition = "default"
                //get use requested word and null check
                let userword = args.find(arg => arg.name.toLowerCase() == 'word').value;
                 if(!userword)return;
                 //use oxford dictionary to find JSON
                 let lookup = dict.find(userword);
                 lookup.then(function(res){
                     //stringify and parse data
                     let data=(JSON.stringify(res,null,4));
                     let object = JSON.parse(data);
                     //get definition from JSON object
                     definition = defenitionGET(object);
                     console.log(definition);
                     //use function to call discord api and send reply
                     client.api.interactions(interactie.id,interactie.token).callback.post(
                        {
                            data:{
                                type:4,
                                data: definition
                            }
                    });



                    },function(error) {
                     return console.error(error);
                 });
            }
        });
}
}
function defenitionGET(object){
    if(object.results[0].lexicalEntries[0].entries[0].senses[0].definitions){
    let definitions=" ";
    for (let u = 0; u < object.results[0].lexicalEntries[0].entries[0].senses[0].definitions.length; u++) {
    definitions+= `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].definitions[u]}.`;
}
return definitions;
}}
function sendreply4(client,interactie,data) {

    

}