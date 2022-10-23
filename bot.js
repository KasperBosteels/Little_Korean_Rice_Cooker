//#region get res
require("dotenv").config();
const logger = require("./logger.js");
const start = require("./startup.js");
const mysql = require("mysql");
const fs = require("node:fs");
const {
  Interaction,
  version,
  GatewayIntentBits,
  Client,
  Collection,
} = require("discord.js");
const config = require("./auth.json");
const prefixcheck = require("./prefixcheck.js");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const slashCommandsFiles = fs
  .readdirSync("./commands/SlashCommands")
  .filter((file) => file.endsWith(".js"));
const profanity = require("./profanityfilter.js");
const level = require("./level.js");
const rice = require("./text responses/rice.js").execute;
const getprefix = require("./getprefixData.js");
const welcome_channel = require("./welcome_data.js");
const profanity_alert_data_collector = require("./profanity_alert_data_collector.js");
const profanity_enabled = require("./profanity_enabled");
const leveling_enabled = require("./leveling_enabled");
const welcomeLeaveMessages = require("./welcome_leave_messages");
const power = require("./powerButton");
const leave = require("./leave").execute;
const server = require("./server_events");
const ignoreusers = require("./ignored_users");
const cooldowns = new Map();
const slashCommandsUpload = require("./uploadSlashCommand");
const logchannels = require("./getLogChannels");
const { guildjoin, guildleave } = require("./member_events");
const custom_Welcome = require("./welcome_message_data_collector.js");
const { Player } = require("discord-music-player");
const G = require("./Generators/GenerateSimpleEmbed");
const updateSwears = require("./update_swear_words");
const processModal = require("./processModal.js").execute;
//#endregion
console.log("running discord.js@" + version);
//#region init bot as client
let intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildPresences,
];
const client = new Client({
  intents: intents,
});
const player = new Player(client, { leaveOnEmpty: false });
client.player = player;
//#endregion

//#region load commands

client.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`command file loaded: ${command.name}`);
}

//#endregion

//#region  load slash commands

client.slashCommands = new Collection();
const slashCommandsArray = [];
for (const slashfile of slashCommandsFiles) {
  const commandslash = require(`./commands/SlashCommands/${slashfile}`);
  client.slashCommands.set(commandslash.data.name, commandslash);
  slashCommandsArray.push(commandslash.data.toJSON());
  console.log(`slash command file loaded: ${commandslash.data.name}`);
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
client.once("ready", () => {
  try {
    //enable discord buttons
    start.execute(client, con);
    getprefix.execute(con);
    profanity_alert_data_collector.execute(con);
    profanity_enabled.execute(con);
    updateSwears.execute(con);
    leveling_enabled.execute(con);
    welcome_channel.execute(con);
    welcomeLeaveMessages.execute(con);
    ignoreusers.execute(con);
    logchannels.execute(con);
    custom_Welcome.execute(con);
    //writeAllPermissions(client);
  } catch (err) {
    console.log(err);
  }
  slashCommandsUpload.execute(slashCommandsArray, process.env.DISCORD_TOKEN);
});
//#endregion

//#region error handler
client.rest.on("error", (Err) => {
  console.log(`An error occured, if problem persists inform devs pls.`);
  fs.writeFileSync("./errors.json", JSON.stringify(Err, null, 2), (err) => {
    if (err) console.log(err);
  });
});
//#endregion

//#region server join/leave.
client.rest.on("guildCreate", async (guild) => {
  await server.join(guild, con);
});
client.rest.on("guildDelete", async (guild) => {
  await server.leave(guild, con);
});
//#endregion

//#region member join/leave.
client.rest.on("guildMemberRemove", async (member) => {
  guildleave(member, con);
});
client.rest.on("guildMemberAdd", async (member) => {
  guildjoin(member, client, con);
});
//#endregion

//#region message processor
client.rest.on("messageCreate", async (Interaction) => {
  if (Interaction.author.bot) return;
  power.execute(Interaction, con);
  profanity.execute(Interaction, client, con);
  if (ignoreusers.GET(Interaction.author.id) == true) return;
  rice(Interaction);
  leave(Interaction, client);

  //removes prefix and puts arguments in variable
  const usedprefix = getprefix.GET(Interaction.guild.id);
  const args = Interaction.content.slice(usedprefix.length).trim().split(/ +/);

  try {
    level.execute(Interaction, con, args, Discord);
  } catch (error) {
    console.error(error.message);
  }

  if (!prefixcheck.execute(Interaction)) return;

  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  //checks if the command is applciable for dm's
  if (command.guildOnly && Interaction.channel.type === "dm") {
    return Interaction.reply({
      content: "i can't perform this action in direct message chat",
    });
  }

  //checks if the command needs an argument if true and no given error Interaction and return to default state
  if (command.args && !args.length) {
    let reply = `you didnt provide any arguments, ${Interaction.author}!`;
    if (command.usage) {
      reply += `\nThe correct way to use this is:\n${command.usage}\n for more help type:  \`${config.prefix}help\` or \`${config.prefix}help ${command.name}\``;
    }
    return Interaction.channel.send({ content: reply });
  }

  //if command is not in map put it in
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

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

  //tries to perform the command if error occurs catch it and display on terminal
  try {
    const startTime = new Date();
    await command.execute(client, Interaction, args, con);
    const endTime = new Date();
    const workTime = endTime - startTime;
    logger.execute(
      usedprefix,
      commandName,
      args,
      undefined,
      Interaction.channel.id,
      Interaction.guild.id,
      workTime
    );
  } catch (error) {
    console.error(error);
    logger.execute(
      usedprefix,
      commandName,
      currentTime,
      args,
      error,
      Interaction.channel.id,
      Interaction.guild.id
    );
    await Interaction.reply({
      content: "there was an error trying to execute that command!",
    });
  }
});
//#endregion
client.rest.on("interactionCreate", async (interaction) => {
  if (interaction.isModalSubmit()) {
    try {
      await interaction.deferReply({
        content:
          "Your submission was received successfully and will be processed.",
        ephemeral: true,
      });
      processModal(interaction, con);
    } catch (error) {
      console.log(error);
    }
  } else if (!interaction.isChatInputCommand()) return;
  const slashcommand = client.slashCommands.get(interaction.commandName);
  if (!slashcommand) return;
  try {
    await slashcommand.execute(client, interaction, con);
  } catch (error) {
    if (error.code == 10062) return;
    await interaction.editReply({ content: error.message, ephemeral: true });
    logger.execute("/", interaction.name, interaction.options, error);
  }
});

//#region    MUSIC EVENT TRIGGERS
client.player
  .on("channelEmpty", (queue) =>
    queue.data.queueInitChannel.send({
      embeds: [
        G.GenerateEmbed(
          "RANDOM",
          "oof, its awfully quiet in here, maybe ill leave too..."
        ),
      ],
    })
  )
  // Emitted when a song was added to the queue.
  .on("songAdd", (queue, song) => {
    queue.data.queueInitChannel.send({
      embeds: [
        G.GenerateEmbed(
          "RANDOM",
          `${song.name}\ntime: ${song.duration}\nrequested by: ${song.requestedBy}`
        ),
      ],
    });
  })
  // Emitted when a playlist was added to the queue.
  .on("playlistAdd", (queue, playlist) =>
    queue.data.queueInitChannel.send({
      embeds: [
        G.GenerateEmbed(
          "RANDOM",
          `with ${playlist.song.length} songs\nby: ${playlist.author}`
        ),
      ],
    })
  )
  // Emitted when there was no more music to play.
  .on("queueDestroyed", (queue) => console.log(`The queue was destroyed.`))
  // Emitted when the queue was destroyed (either by ending or stopping).
  .on("queueEnd", (queue) =>
    queue.data.queueInitChannel.send({
      embeds: [G.GenerateEmbed("RANDOM", "Playlist finished.")],
    })
  )
  // Emitted when a song changed.
  .on("songChanged", (queue, newSong, oldSong) =>
    queue.data.queueInitChannel.send({
      embeds: [
        G.GenerateEmbed(
          "RANDOM",
          `and that was our lovely ${oldSong.author} with ${oldSong.name}\n now upcoming ${newSong.name}\n${newSong.length}`,
          false,
          false,
          true,
          false,
          "now playing",
          newSong.url,
          newSong.thumbnail
        ),
      ],
    })
  )
  // Emitted when a first song in the queue started playing.
  .on("songFirst", (queue, song) =>
    console.log(`music player started with:\n${song}.`)
  )
  // Emitted when someone disconnected the bot from the channel.
  .on("clientDisconnect", (queue) =>
    console.log(`I was kicked from the Voice Channel, queue ended.`)
  )
  // Emitted when deafenOnJoin is true and the bot was undeafened
  .on("clientUndeafen", (queue) => console.log(`I got undefeanded.`))
  // Emitted when there was an error in runtime
  .on("error", (error, queue) => {
    console.log(`Error: ${error} in ${queue.guild.name}`);
  });
//#endregion
client.login(process.env.DISCORD_TOKEN);

//#region  error handles
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
process
  .on("DiscordAPIError", (error) => {
    Interaction.channel.send({
      content:
        "Message was too big to send in discord, sorry. <:sadgeCooker:910210761136148581>",
    });
    console.log(error);
  })
  .on("error", (error, queue) => {
    console.log(`ERROR: ${error} in ${queue.guild.name}`);
  });
//#endregion

/*cool links
 https://i.imgur.com/18qFmWU.mp4
 https://i.imgur.com/FIZVQik.mp4
 https://imgur.com/t/anime_gifs/p4xuail
 https://matias.ma/nsfw/
 https://i.imgur.com/z3AJL70.gif
 https://i.imgur.com/dWK54ms.gif
 https://i.gifer.com/3lAO.gif
 don't forget reconlx (google images thingy old)
     is still in package maybe do something with it
*/
