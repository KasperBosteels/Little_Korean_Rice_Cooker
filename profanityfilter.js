const fs = require('fs');
module.exports = {
    execute(message){
        proffilter(message);
    }
};


function proffilter(message) {
    var messageArray = message.content.split();
    var swear = getswearwords();
    var sentecUser = "";
    var amountswear = 0;

    //for every word in message check if it is in the swearwords list
    for (let Y = 0; Y < messageArray.length; Y++) {

        const word = messageArray[Y].toLowerCase();
        
        var changeword = "";

        for (let i = 0; i < swear["vloekwoorden"].length; i++) {
            //#region replace word with ***** disabled for now
          if(word.includes(swear["vloekwoorden"][i])){

            changeword = word.replace(swear["vloekwoorden"][i], "******");

            sentecUser += " " + changeword;

            amountswear++;

          }
          
        }
        //glue message togheter again
      if(!changeword){
          sentecUser+= " " + messageArray[Y];
      }
      //#endregion
      //if there are more than 0 swear words found be annoying
      if (amountswear != 0){
          //message.delete();
          //message.channel.send(sentecUser);
          message.channel.send("no profanity");
          console.log(`profanity  ${message.author.tag}   \"${message.content}\"`)
      }
      //check if any of the characters are arabic if true replace with chiken soup
    }if(HasArabicCharacters(message)){
        message.delete();
        message.channel.send("chiken soup !");
    };


    
}





//get swear words from json file
function getswearwords() {
return JSON.parse(fs.readFileSync("./swearwords.json")); 
}
//check for arabic
function HasArabicCharacters(text) {
    var arregex = /[\u0600-\u06FF]/;
    return arregex.test(text);
}