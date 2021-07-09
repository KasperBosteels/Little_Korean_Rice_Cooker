module.exports = {
     execute(message){
        if(message.author.id != '258217948819357697')return;
        if(message.content.includes("shutdown")){
        message.channel.send('Pressing the power button...')
        .then(()=>{
            console.log('shutting down...')
        })
        .catch((err)=>{
            console.error(err)
        })
        .finally(()=>{
            process.exit()
        })     
    }
    }
};