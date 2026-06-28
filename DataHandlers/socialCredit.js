
module.exports = {
  async ADD(con, score = 1, userID) {
    let m = await con.manager.findOneBy("User",{user_id:userID})
   const points = parseInt(m.user_score)+score
   m.user_score=points
    await con.manager.save("User",m)
  },
  async SUBTRACT(con, score = 1, userID) {
    const m = await con.manager.findOneBy("User",{user_id:userID})
    const points = parseInt(m.user_score) - score
    m.user_score=points;
    await con.manager.save("User",m)
  },
  async GETSCORE(con, userID) {
    const score = await con.manager.findOneBy("User",{user_id:userID}).then((m)=>{
    console.log(m)
    const score = parseInt(m.user_score)
    return score? score : 1000;
  });
  return score;
  },
  async ADDUSER(con,user){
    await con.manager.insert("User",{user_id:`${user.id}`,user_name:`${user.displayName}`,user_score:1000})
  }
};
