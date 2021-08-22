module.exports = {
    ADD(con,score,userID){
        var userScore,points;
        points = score;
        con.query(`SELECT socialScore FROM score WHERE userID="${userID}"`,(err,score)=>{
            if(score.length){
                userScore = score[0].socialScore
                con.query(`UPDATE score set socialScore=${userScore + points} WHERE userID = '${userID}';`)
            }else{
                con.query(`INSERT INTO score (userID,socialScore) VALUES ("${userID}",${10000 + points});`)
            }
        })
    },
    SUBTRACT(con,score,userID){
        var userScore,points;
        points = score;
        con.query(`SELECT socialScore FROM score WHERE userID="${userID}"`,(err,score)=>{
            if(score.length){
                userScore = score[0].socialScore
                con.query(`UPDATE score set socialScore=${userScore - points} WHERE userID = '${userID}';`)
            }else{
                con.query(`INSERT INTO score (userID,socialScore) VALUES ("${userID}",${10000 - points});`)
            }
        })
    },
    ADDUSER(con,userID){
        con.query(`INSERT INTO score (userID,socialScore) VALUES ("${userID}",10000);`,(err,score)=>{
            if(err)return console.error(err)
            
        })
    },
    GETSCORE(con,userID){
        let SCS
         con.query(`SELECT socialScore FROM score WHERE userID="${userID}";`,(err,score)=>{
            if(err)return console.error(err);
            if(score.length){
                SCS =  score[0].socialScore;
            }else{
                SCS = "no credit granted";
            }
        });
        console.log(SCS)
        return SCS;
    }
};