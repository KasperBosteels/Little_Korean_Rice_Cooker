const fs = require("fs");
    module.exports = {
     
        execute(message) {
            var messageArray = message.content.split();
            var swear = getswearwords();
            Rice(message,messageArray,swear);
            Good(message,messageArray,swear);
        },
    };
//get swear words from json file
function getswearwords() {
    return JSON.parse(fs.readFileSync("./swearwords.json")); 
    }

function Bad(message,messageArray,swear){
    
}
function Good(message,messageArray,swear){
    var amountswear = 0;

    for (let A = 0; A < messageArray.length; A++) {
        const word = messageArray[A].toLowerCase();
        for (let U = 0; U < swear["good"].length; U++) {
            if (word.includes(swear["good"][U])){
                amountswear++;
            }
        }
        if(amountswear != 0){
            message.channel.send("thank you (っ ᵔ ₃ ᵔ )っ🎔");
        } 
        
    }
}
function Rice(message,messageArray,swear){
    var amountswear = 0;

    for (let A = 0; A < messageArray.length; A++) {
        const word = messageArray[A].toLowerCase();
        for (let U = 0; U < swear["rice"].length; U++) {
            if (word.includes(swear["rice"][U])){
                amountswear++;
            }
        }
        if(amountswear != 0){
            message.channel.send("here you go, :rice:");
        } 
        
    }
}