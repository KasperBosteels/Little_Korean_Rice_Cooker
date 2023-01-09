
module.exports = {
  async ADD(con, score = 1, userID) {
    let m = await con.manager.findOneBy("User",{user_id:userID})
   const points = parseInt(m.user_score)+score
   m.user_score=points
    await con.manager.save("Users",m)
  },
  async SUBTRACT(con, score = 1, userID) {
    const m = await con.manager.findOneBy("User",{user_id:userID})
    const points = parseInt(m.user_score) - score
    m.user_score=points;
    con.manager.save("Users",m)
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
    await con.manager.insert("Users",{user_id:user.id,user_name:user.displayName,user_score:1000})
  }
};
