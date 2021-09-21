module.exports = {
    execute(message,client){
       if(message.author.id != '258217948819357697' && message.author.id != "256696952626872321")return;
       if(message.content.includes("*leave")){
       message.channel.send('Sayonara')
       .then(()=>{
           console.log(`leaving server: ${message.guild}`);
       })
       .catch((err)=>{
           console.error(err)
       })
       .finally(()=>{
        message.guild.leave();            
        })     
    }
   }
};