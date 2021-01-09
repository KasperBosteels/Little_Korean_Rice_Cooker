module.exports ={

    execute(message){
        liedetector(message);
        return;
    }

}

function liedetector (message){
   
if (message.content.toLowerCase() == "bot lies" || message.content.toLowerCase() == "bot lie") {
    message.reply("i dont lie");
}
}