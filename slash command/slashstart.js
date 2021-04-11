module.exports = {
    execute(client){
        client.api.applications(client.user.id).guilds('735448895013912576').commands.post({
            data:{
                name:"test",
                description:"test van comando"
        }
        });
        client.api.applications(client.user.id).guilds('735448895013912576').commands.post({
            data:{
                name:"tekst",
                description:"antwoord met teksts",
                options:[{
                    name:'inhoud',
                    description:'inhoud van bericht',
                    type: 3,
                    required: true
                }]
        }
        });
        client.api.applications(client.user.id).guilds('735448895013912576').commands.post({
            data:{
                name:"oxford",
                description:"oxford dictionary",
                options:[{
                    name:'word',
                    description:'oxford results',
                    type: 3,
                    required: true
                }]
        }
        });
}
}