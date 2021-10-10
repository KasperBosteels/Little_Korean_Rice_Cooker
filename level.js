const sqlconnect = require("./sql_serverconnection.js");
const leveling_enabled = require("./leveling_enabled");
const score = require("./socalCredit");
module.exports = {
  async execute(message, con, args, Discord) {
    //if leveling is disabled then stop this command and return
    if (!leveling_enabled.CONFIRM(message.guild.id)) return;

    let randomint;
    randomint = Math.floor(Math.random() * args.length + 1);
    let userID = await message.author.id;
    con.query(
      `SELECT level FROM levels WHERE userID = "${userID}";`,
      (err, rows) => {
        if (err) console.log(err);
        if (!rows.length) {
          con.query(
            `INSERT INTO levels (userID,level,exp) VALUES ("${userID}",1,0)`
          );
        } else {
          con.query(
            `SELECT level ,exp FROM levels WHERE userID = "${userID}"`,
            (err, rows) => {
              if (err) return console.log(err);
              var LEV = rows[0].level;
              var EXP = rows[0].exp + randomint;
              var nextlevel = (15 + 300) * LEV;
              if (EXP >= nextlevel) {
                //258217948819357697;
                LEV++;
                EXP = 0;
                var mem = message.member;
                var name;
                if (!mem) {
                  return;
                } else if (mem.nickname) {
                  name = mem.nickname;
                } else {
                  name = mem.displayName;
                }
                //#region embed
                var embed = new Discord.MessageEmbed()
                  .setColor("#006400")
                  .setTitle(":partying_face: level up :partying_face:")
                  .setTimestamp()
                  .setAuthor(
                    "Little_Korean_Rice_Cooker",
                    "https://i.imgur.com/A2SSxSE.png"
                  )
                  .setImage("https://i.imgur.com/Uyw52SY.gif")
                  .setDescription(
                    `YEAH!! ${mem.nickname} reached level ${LEV}\nTO THE STARS AND BEYOND!!`
                  );
                //#endregion
                try {
                  sqlconnect.execute(con, mem, 6, embed, message);
                  con.query(
                    `UPDATE levels SET level = ${LEV}, exp = 0 WHERE userID = "${userID}"`,
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                } catch (err) {
                  console.log(err);
                }
                console.log(`mem`);
              }
              con.query(
                `UPDATE levels SET level = ${LEV}, exp = ${EXP} WHERE userID = "${userID}"`
              );
            }
          );
          score.ADD(con, 100, userID);
        }
      }
    );
  },
};
