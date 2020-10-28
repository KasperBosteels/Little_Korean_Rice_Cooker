
module.exports ={

    execute(message){
        liedetector(message);
        return;
    }

}

function liedetector (message){
   let sentece = message.content;
   
if (message.content.toLowerCase() == "bot lies" || message.content.toLowerCase() == "bot lie") {
    message.reply("i dont lie");
}
}