module.exports = {
    execute(con){
   

    }
};
function Q(con){
    con.query(`SELECT guildID, prefix FROM prefix`,(err,rows) => {
        if(err)return console.log(err);

        return rows;
    })
}