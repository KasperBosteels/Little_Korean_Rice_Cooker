
module.exports = {
  async ADD(con, score = 1, userID) {
    let m = await con.manager.findOneBy("User",{user_id:userID})
    m.user_score+=score
    await con.manager.save("Users",m)
  },
  async SUBTRACT(con, score = 1, userID) {
    const m = await con.manager.findOneBy("User",{user_id:userID})
    m.user_score -= score
    con.manager.save("Users",m)
  },
  async GETSCORE(con, userID) {
    const m = await con.manager.findOneBy("User",{user_id:userID})
    return m.user_score? m.user_score : 1000;
  },
};
