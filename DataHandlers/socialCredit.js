
module.exports = {
  async ADD(con, score = 1, userID) {
    var points;
    points = score;

    let m = await con.manager.findOneBy("Member",{user_id:userID})
    if(m.score.length){
      score+=points
    }else{
      score = 1000+points
    }
    await con.manager.update(m)
  },
  async SUBTRACT(con, score = -1, userID) {
    var userScore, points;
    points = score;

    const m = await con.manager.findOneBy("Member",{user_id:userID})
    if(m.score.length){
      m.score-= points
    }else{
      m.score = 1000-points
    }
    con.manager.update(m)

  },
  async GETSCORE(con, userID) {
    const m = await con.manager.findOneBy("Member",{user_id:userID})
    return m.score? m.score : 1000;
  },
};
