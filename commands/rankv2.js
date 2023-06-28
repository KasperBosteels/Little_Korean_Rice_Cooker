const {AttachmentBuilder} = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "level",
  description: "See the current level, and rank in the global list.",
  cooldown: 3,
  usage: "<optional: @user>",
  category: "General",
  aliases: ["rank"],
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    var member = getID(message, args, client);
    let ID = member.id;
    const user = await con.manager.findOneBy("Users",{user_id:ID})
    if(!user)return message.channel.send({ content: "I didn't find that user." })
    var LEV = user.user_level
    var EXP = user.user_experience
    if (LEV == null || EXP == null)return console.log(`${LEV}\n${EXP}`);
    var nextlevel = (15 + 300) * LEV;
    try {
         makeCard(LEV, EXP, nextlevel, 0, member, message);
     } catch (err) {
          console.log(err);
     }
          
        
    }     
}
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
    .setCurrentXP(parseInt(exp))
    .setLevel(parseInt(lev))
    .setRank(parseInt(rank))
    .setRequiredXP(parseInt(nextlevel));
  if (mem.presence != null) {
    card.setStatus(mem.presence.status);
  }
  card
    .setProgressBar("#149414", "COLOR")
    .setUsername(mem.user.username)
    .setDiscriminator(mem.user.discriminator);
  card.build().then((data) => {
    const attachment = new AttachmentBuilder(data, "rankcard.png");
    sendCard(attachment, message);
  });
  return;
}
function sendCard(card, message) {
  return message.channel.send({ files: [card] });
}
