//#region get res
require("dotenv").config();
require("ms");
const logger = require("./logger.js");
const start = require("./startup.js");
const sqlconnect = require("./sql_serverconnection.js");
const mysql = require("mysql");
const fs = require("fs");
const Discord = require("discord.js");
const { Intents } = require("discord.js");
const config = require("./auth.json");
const prefixcheck = require("./prefixcheck.js");
const lie = require("./text responses/liedetector.js");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const profanity = require("./profanityfilter.js");
const level = require("./level.js");
const rice = require("./text responses/rice.js");
const getprefix = require("./getprefixData.js");
const profanity_alert_data_collector = require("./profanity_alert_data_collector.js");
const profanity_enabled = require("./profanity_enabled");
const leveling_enabled = require("./leveling_enabled");
const welcomeLeaveMessages = require("./welcome_leave_messages");
const power = require("./powerButton");
const changesocial = require("./change socialcreditcommand");
const socalCredit = require("./socalCredit");
const leave = require("./leave");
const server = require("./server_events");
const ignoreusers = require("./ignored_users");
const music = require("@koenie06/discord.js-music");
const events = music.event;
const cooldowns = new Map();
const chatBot = require("smartestchatbot");
const chatClient = new chatBot.Client();
//#endregion

//#region init bot as client
let intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGE_TYPING,
];
const client = new Discord.Client({ intents: intents });

//#endregion

//#region discord buttons

client.commands = new Discord.Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`command file loaded: ${command.name}`);
}

//#endregion

//#region sql login data
//sets sql login data in veriable for use
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERSQLSERVER,
  password: process.env.PASSWORDSQLSERVER,
  database: process.env.DATABASE,
  port: 3306,
  multipleStatements: true,
});
//#endregion

//#region bot ready
//default state when bot starts up will set activity
//and display succes message in terminal
client.on("ready", () => {
  try {
    //enable discord buttons

    start.execute(client, con);
    getprefix.execute(con);
    profanity_alert_data_collector.execute(con);
    profanity_enabled.execute(con);
    leveling_enabled.execute(con);
    welcomeLeaveMessages.execute(con);
    ignoreusers.execute(con);
  } catch (err) {
    console.log(err);
  }
});

//for slash commands
async function CreateApiMessage(interactie, content) {
  let apiMessage = await Discord.APIMessage.create(
    client.channels.resolve(interactie.channel_id),
    content
  )
    .resolveData()
    .resolveFiles();
  return { ...apiMessage.data };
}
//#endregion

//#region error handler
client.on("error", (Err) => {
  console.log(`An error occured, if problem persists inform devs pls.`);
  fs.writeFileSync("./errors.json", JSON.stringify(Err, null, 2), (err) => {
    if (err) console.log(err);
  });
});
//#endregion

//#region slash command

//#endregion

//#region bot join
client.on("guildCreate", (guild) => {
  server.join(guild, con);
});
client.on("guildDelete", (guild) => {
  server.leave(guild, con);
});
//#endregion

//#region member leave
//member leaves guild will trigger logchannel check and sad message
client.on("guildMemberRemove", (member) => {
  console.log(`member left ${member.displayName} ${member.guild}`);
  if (!welcomeLeaveMessages.CONFIRM(member.guild.id)) return;
  var embed = new Discord.MessageEmbed()
    .setColor("#006400")
    .setTitle("oh no")
    .setTimestamp()
    .setAuthor("Little_Korean_Rice_Cooker", "https://i.imgur.com/A2SSxSE.png")
    .setThumbnail(
      member.user.avatarURL({ dynamic: true, format: "png", size: 64 })
    )
    .setDescription(`${member.displayName} left`);
  try {
    sqlconnect.execute(con, member, 5, embed);
  } catch (err) {
    console.log(err);
  }
});
//#endregion

//#region member join
//member joins execute sql connection with parameters that correspondt with friendly message in logchannel
client.on("guildMemberAdd", (member) => {
  console.log(`member joined ${member.displayName} ${member.guild}`);
  if (!welcomeLeaveMessages.CONFIRM(member.guild.id)) return;
  var embed = new Discord.MessageEmbed()
    .setColor("#006400")
    .setTitle("hello")
    .setTimestamp()
    .setAuthor("Little_Korean_Rice_Cooker", "https://i.imgur.com/A2SSxSE.png")
    .setThumbnail(
      member.user.avatarURL({ dynamic: true, format: "png", size: 64 })
    )
    .setDescription(`welcome, ${member.displayName}`);

  try {
    sqlconnect.execute(con, member, 5, embed);
  } catch (err) {
    console.log(err);
  }
  socalCredit.ADDUSER(con, member.id);
});
//#endregion

//#region message processor
//when a user sends a message
client.on("messageCreate", async (Interaction) => {
  //#region bot ignore
  if (Interaction.author.bot || ignoreusers.GET(Interaction.author.id) != false)
    return;
  //#endregion

  //#region reboot
  power.execute(Interaction, con);
  //#endregion

  //#region social credit change command
  changesocial.execute(client, Interaction, con);
  //#endregion

  //#region simple responses
  profanity.execute(Interaction, client, con);
  lie.execute(Interaction);
  rice.execute(Interaction);
  leave.execute(Interaction, client);
  //#endregion

  //#region Interaction slice and dice
  //removes prefix and puts arguments in variable
  let usedprefix = getprefix.GET(Interaction.guild.id);
  const args = Interaction.content.slice(usedprefix.length).trim().split(/ +/);

  //#region level handler
  try {
    level.execute(Interaction, con, args, Discord);
  } catch (error) {
    console.error(error.message);
  }
  //#endregion

  //#region prefix check
  //check if messages contains the selected prefix
  if (!prefixcheck.execute(Interaction)) return;
  //#endregion

  //makes sure command name is lowercase
  const commandName = args.shift().toLowerCase();
  //#endregion

  //#region command lookup
  //checks if Interaction containts a command name/alias if true then asign it to variable if false return to default state
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  //#endregion

  //#region dm applicable check
  //checks if the command is applciable for dm's
  if (command.guildOnly && Interaction.channel.type === "dm") {
    return Interaction.reply({
      content: "i can't perform this action in direct message chat",
    });
  }
  //#endregion

  //#region argumant needed check
  //checks if the command needs an argument if true and no given error Interaction and return to default state
  if (command.args && !args.length) {
    let reply = `you didnt provide any arguments, ${Interaction.author}!`;
    if (command.usage) {
      reply += `\nThe correct way to use this is:\n\`${command.usage}\`\n for more help type:  \`${config.prefix}help\` or  \`${config.prefix}help ${command.name}\``;
    }
    return Interaction.channel.send({ content: reply });
  }
  //#endregion

  //#region cooldown
  //if command is not in map put it in
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  //get current time, get timestamp from command, get cooldown time of command
  let currentTime = Date.now();
  let timeStamps = cooldowns.get(command.name);
  let cooldownTime = command.cooldown * 1000;

  if (timeStamps.has(Interaction.author.id)) {
    let exeperationTime = timeStamps.get(Interaction.author.id) + cooldownTime;
    if (currentTime < exeperationTime) {
      let timeLeft = (exeperationTime - currentTime) / 1000;
      return Interaction.reply({
        content: `Please wait ${timeLeft.toFixed(
          1
        )} seconds before using this command again.`,
      });
    } else {
      timeStamps.delete(Interaction.author.id);
    }
  }
  timeStamps.set(Interaction.author.id, currentTime);

  //#endregion

  //#region execute command
  //tries to perform the command if error occurs catch it and display on terminal
  try {
    command.execute(client, Interaction, args, con, chatClient);
    logger.execute(Interaction);
  } catch (error) {
    console.error(error);
    Interaction.reply({
      content: "there was an error trying to execute that command!",
    });
  }
  //#endregion
});
//#endregion

//#region   MUSIC EVENT TRIGGERS

events.on("playsong", async (channel, songInfo, requester) => {
  console.log(requester, channel, songInfo);
  channel.send({
    content: `starting: ${songInfo.title} - by: ${songInfo.author}\n requested by: ${requester}`,
  });
});
events.on("addSong", async (channel, songInfo, requester) => {
  console.log(requester, channel, songInfo);

  channel.send({
    content: `added song to the queue: ${songInfo.title} - by: ${songInfo.author}\nrequested by: ${requester}`,
  });
});
events.on("playList", async (channel, playlist, songInfo, requester) => {
  console.log(requester, channel, songInfo, playlist);

  channel.send({
    content: `Starting: ${songInfo.title} - by: ${songInfo.author}\nplaylist: ${playlist.title}\nrequested by: ${requester}`,
  });
});
events.on("addList", async (channel, playlist, requester) => {
  console.log(requester, channel, playlist);

  channel.send({
    content: `added playlist to the queue: ${playlist.title}\n videos: ${playlist.videos.length} by: ${songInfo.author}\n requested by: ${requester}`,
  });
});
events.on("finish", async (channel) => {
  console.log(channel);

  channel.send({ content: `I am now playing: silence` });
});

//#endregion

//#region bot login
//initiate bot by connecting to server and logging in with token
client.login(process.env.DISCORD_TOKEN);
//#endregion

//#region proces error
//if during proces an error occurs catch and display on terminal
process.on("uncaughtException", (error) => console.log("error", error));
process.on("unhandledRejection", (error) => console.log("error", error));
process.on("ECONNRESET", (error) => {
  con.destroy();
  con.connect();
  console.error(error.message);
});
process.on("PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR", (error) => {
  con.connect();
  throw error;
});
process.on("DiscordAPIError", (error) => {
  Interaction.channel.send({
    content: "Message was too big to send in discord, sorry.",
  });
  console.log(error);
});
//#endregion

/*cool links
 https://i.imgur.com/18qFmWU.mp4
 https://i.imgur.com/FIZVQik.mp4
 https://imgur.com/t/anime_gifs/p4xuail
 https://matias.ma/nsfw/
 https://i.imgur.com/z3AJL70.gif
 https://i.imgur.com/dWK54ms.gif
 test
 don't forget reconlx (google images thingy old)
     is still in package maybe do something with it


---------------------------------------------------------------------------------------
koenie audioplayer 
my settings seem to work:

    let resource = await createAudioResource(ytdl(data.queue[0].url, { filter: 'audioonly',highWaterMark:1<<25,quality:'highestaudio'}), { 
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
    });

*/
