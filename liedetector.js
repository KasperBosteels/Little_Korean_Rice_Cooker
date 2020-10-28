
module.exports ={

    execute(message){
        liedetector(message);
        return;
    }

}

function liedetector (message){
if (message.content == "bot lies" || message.content == "bot lie") {
    message.reply("i dont lie");
}
}