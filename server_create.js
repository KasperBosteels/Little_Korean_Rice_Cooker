module.exports = {
	
	async execute(guild,con) {
        
        con.query(`INSERT INTO guild (guildID,level_system,log_channel,prefix,profanity,profanity_channel) VALES("${guild.id}",0,NULL,'-',0,NULL);`,(err)=>{
            if(err)return console.log(err);
        });
},
};