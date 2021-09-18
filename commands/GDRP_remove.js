const score = require('../socalCredit');
module.exports = {
	name: 'remove-my-data',
	description: 'Remove all your data from the server (after this command if you do not manually remove the bot it will gather data again).',
	cooldown: 1,
	usage: ' ',
	category: "config",
	async execute(client,message, args,con) {
        let id = message.author.id;
        let data_removed_string = " ";
        try{
        await con.query(`DELETE FROM levels WHERE userID = "${id}";`,(err)=>{
            if(err){
                data_removed_string = "unable to remove level data, please contact dev using the message command.";
                console.log(err);
            }else{
                data_removed_string = "level data removed.";
            }
        })
        await con.query(`DELETE FROM score WHERE userID = "${id}";`,(err)=>{
            if(err){
                data_removed_string += "\nunable to remove social score data, contact dev using the message command.";
                console.log(err);
            }else{
                data_removed_string += "\nsocial score data removed."
            }
        })
        await con.query(`DELETE FROM verjaardage WHERE userID = "${id}";`,(err)=>{
            if(err){
                console.log(err)
                data_removed_string +="\nunable to remove birthday data(if set),contact dev using the message command.";
            }else{
                data_removed_string +="\nbirthday data removed(if set).";
            }
        })
        await con.query(`DELETE FROM warnings WHERE userID = "${id}";`,(err)=>{
            if(err){
                console.log(err)
                data_removed_string += "\nunable to delete warnings data, contact dev using the message command.";
            }
        })
        }finally{
            return message.reply(data_removed_string);
        }
	},
};