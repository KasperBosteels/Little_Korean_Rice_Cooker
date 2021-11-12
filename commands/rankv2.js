const Discord = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "level",
  description: "See the current level, and rank in the global list.",
  cooldown: 3,
  usage: "<optional: @user>",
  category: "General",
  aliases: ["rank"],
  execute(client, message, args, con) {
    var member = getID(message, args, client);
    let ID = member.id;
    con.query(`SELECT * FROM levels WHERE userID = "${ID}";`, (err, rows) => {
      if (err) console.log(err);
      if (!rows.length) {
        return message.channel.send({ content: "I didn't find that user." });
      } else {
        con.query(
          `SELECT s.level,s.exp,s.number FROM ( SELECT userID,level,exp,(@ROW_NUMBER:=@ROW_NUMBER + 1 ) AS number FROM levels, (SELECT @ROW_NUMBER := 0) init_variable ORDER BY level DESC) AS s WHERE userID = "${ID}";`,
          (err, rows) => {
            //con.query(`SELECT level, exp, ( @ROW_NUMBER:=@ROW_NUMBER + 1 ) AS number FROM levels, (SELECT @ROW_NUMBER := 0) init_variable WHERE userID = "${ID}" ORDER BY level DESC`,(err,rows) =>{
            if (err) {
              console.log(err);
            }
            var LEV = rows[0].level;
            var EXP = rows[0].exp;
            var rank = rows[0].number;
            if (LEV == null || EXP == null)
              return console.log(`${LEV}\n${EXP}`);
            var nextlevel = (15 + 300) * LEV;
            try {
              makeCard(LEV, EXP, nextlevel, rank, member, message);
            } catch (err) {
              console.log(err);
            }
          }
        );
      }
    });
  },
};
function getID(message, args, client) {
  let member =
    message.mentions.members.first() ||
    client.users.cache.get(args[0]) ||
    client.users.cache.find(
      (user) => user.username.toLowerCase() == args.join(" ").toLowerCase()
    ) ||
    client.users.cache.find(
      (user) => user.tag.toLowerCase() == args.join(" ").toLowerCase()
    );

  if (!member) member = message.member;

  return member;
}
function makeCard(lev, exp, nextlevel, rank, mem, message) {
  const card = new canvacord.Rank()

    .setAvatar(mem.user.displayAvatarURL({ dynamic: true, format: "png" }))
    .setCurrentXP(exp)
    .setLevel(lev)
    .setRank(rank)
    .setRequiredXP(nextlevel)
    .setStatus(mem.presence.status)
    .setProgressBar("#149414", "COLOR")
    .setUsername(mem.user.username)
    .setDiscriminator(mem.user.discriminator);
  card.build().then((data) => {
    const attachment = new Discord.MessageAttachment(data, "rankcard.png");
    sendCard(attachment, message);
  });
  return;
}
function sendCard(card, message) {
  return message.channel.send({ files: [card] });
}
