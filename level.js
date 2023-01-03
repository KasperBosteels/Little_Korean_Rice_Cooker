const leveling_enabled = require("./DataHandlers/leveling_enabled");
const score = require("./DataHandlers/socialCredit");
const logchannel = require("./sendToLogChannel");
const G = require("./Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  async execute(message, con, args, Discord) {
    //if leveling is disabled then stop this command and return
    if (!leveling_enabled.CONFIRM(message.guild.id)) return;

    let randomint;
    randomint = Math.floor(Math.random() * args.length + 1);
    let userID = await message.author.id;
    const member = await con.manager.findOneBy("User",{user_id:userID})
    if(!member){await con.manager.create("User",{ user_id:userID,user_name:message.member.username,user_level:1,is_ignored:false,user_experience:0,user_score:1000})
        } else {
              var LEV = member.user_level;
              var EXP = member.user_experience + randomint;
              var nextlevel = (15 + 300) * LEV;
              if (EXP >= nextlevel) {
                LEV++;
                EXP = 0;
                let mem = message.member;
                let name = null;

                if (mem.nickname || mem.user.username) {
                  if (
                    mem.nickname != undefined &&
                    mem.nickname != null &&
                    mem.nickname != ""
                  ) {
                    name = mem.nickname;
                  } else {
                    name = mem.user.username;
                  }
                } else {
                  return console.log(mem);
                }
                //#region embed
                const E = G("#006400", `YEAH!! ${name} reached level ${LEV}\nTO THE STARS AND BEYOND!!`,false,false,true,"https://i.imgur.com/Uyw52SY.gif",":partying_face: level up :partying_face:")
                //#endregion
                try {
                  logchannel.logWithNoMember(E, message);
                  await con.manager.update("User",{user_id:userID},{user_level:LEV,user_experience:0})
                } catch (err) {
                  console.log(err);
                }
                score.ADD(con, 100, userID);
              }
              await con.manager.update("User",{user_id:userID},{user_level:LEV,user_experience:EXP});
            }
          
        }
      }
