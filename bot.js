//#region get res
require("dotenv").config();
require("reflect-metadata")
const logger = require("./logger.js");
const start = require("./startup.js");
const fs = require("node:fs");
const {
  version,
  GatewayIntentBits,
  Client,
  Collection,
} = require("discord.js");
const Discord = require("discord.js");
const config = require("./auth.json");
const prefixcheck = require("./prefixcheck.js");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const SelectFiles = fs
  .readdirSync("./SelectMenus")
  .filter((file) => file.endsWith(".js"));
const profanity = require("./profanityfilter.js");
const level = require("./level.js");
const rice = require("./text responses/rice.js").execute;
const getprefix = require("./DataHandlers/getprefixData");
const welcome_channel = require("./DataHandlers/welcome_data.js");
const profanity_alert_data_collector = require("./DataHandlers/profanity_alert_data_collector");
const profanity_enabled = require("./DataHandlers/profanity_enabled");
const leveling_enabled = require("./DataHandlers/leveling_enabled");
const welcomeLeaveMessages = require("./DataHandlers/welcome_leave_messages");
const power = require("./powerButton");
const leave = require("./leave").execute;
const server = require("./DataHandlers/server_events");
const ignoreusers = require("./DataHandlers/ignored_users");
const cooldowns = new Map();
const logchannels = require("./DataHandlers/getLogChannels");
const { guildjoin, guildleave } = require("./member_events");
const custom_Welcome = require("./DataHandlers/welcome_message_data_collector.js");
const { Player } = require("discord-music-player");
const G = require("./Generators/GenerateSimpleEmbed");
const updateSwears = require("./DataHandlers/update_swear_words");
const processModal = require("./processModal.js").execute;
const SlashCommandLoader = require("./uploadSlashCommand").execute;
const makeIndex =require('./SelectMenus/HelpSelectMenu').makeIndex;
//#region typeorm related imports
const DataSource = require ("typeorm").DataSource
const User =require ("./entity/User.js");
const Guild = require ("./entity/guild");
const Message = require ("./entity/Message");
const Playlist = require( "./entity/Playlist");
const Swearword = require ("./entity/Swearword");
const Warning = require ("./entity/Warning");
const Custom_Swear = require('./entity/Custom_Swears.js')
const con = new DataSource({
  type: process.env.TYPE,
  host: process.env.HOST,
  port:parseInt(process.env.PORT),
  username: process.env.SERVER_USER,
  password: process.env.SERVER_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  migrations:true,
  poolSize:30,
  migrationsRun:true,
  entities:[ User, Custom_Swear,Warning,Guild,Message,Playlist,Swearword],
  migrations: [],
  subscribers: [],
  connectTimeout:5000,
  acquireTimeout:5000,
  multipleStatements:true,
});
//#endregion
console.log("\x1b[33m", "running discord.js@" + version, "\x1b[0m");
//#endregion
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
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages,
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
  if (command.name) {
    client.commands.set(command.name, command);
    console.log("\x1b[32m", `command file loaded: ${command.name}`, "\x1b[0m");
  } else {
    console.log("\x1b[33m", `command file not loaded: ${file}`, "\x1b[0m");
  }
}

client.selectMenus = new Collection();
for (const file of SelectFiles) {
  const menu = require(`./SelectMenus/${file}`);
  if (menu.name) {
    client.selectMenus.set(menu.name, menu);
    console.log("\x1b[32m", `select menu loaded ${menu.name} [^]`, "\x1b[0m");
  } else {
    console.log(
      "\x1b[33m",
      `failed to load ${file.split(".js")[0]}`,
      "\x1b[0m"
    );
  }
}

//#endregion

//#region bot ready
client.once("ready",async  () => {
  try {
    await start.execute(client,con);
    getprefix.execute(client,con);
    profanity_alert_data_collector.execute(con);
    profanity_enabled.execute(con);
    updateSwears.execute(con);
    /*
    leveling_enabled.execute(con);
    welcome_channel.execute(con);
    welcomeLeaveMessages.execute(con);
    ignoreusers.execute(con);
    logchannels.execute(con);
    custom_Welcome.execute(con);
    */
    SlashCommandLoader(process.env.DISCORD_TOKEN, client);
  } catch (err) {
    console.log(err);
  }
});
//#endregion

//#region error handler
client.on("error", (Err) => {
  fs.writeFileSync(
    "./info/errors.json",
    JSON.stringify(Err, null, 2),
    (err) => {
      if (err) console.log(err);
    }
  );
});
//#endregion

//#region server join/leave.
client.on("guildCreate", async (guild) => {
  await server.join(guild, con);
});
client.on("guildDelete", async (guild) => {
  await server.leave(guild, con);
});
//#endregion

//#region member join/leave.
client.on("guildMemberRemove", async (member) => {
  guildleave(member, con);
});
client.on("guildMemberAdd", async (member) => {
  guildjoin(member, client, con);
});
//#endregion

//#region message processor
client.on("messageCreate", async (Interaction) => {
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
      content: "i can't perform this action in direct messages",
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
    const workTime = new Date() - startTime;
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
client.on("interactionCreate", async (interaction) => {
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
  } else if (interaction.isSelectMenu()) {
    await interaction.deferReply();
    const selectMenus = client.selectMenus;
    const { customId } = interaction;
    console.log(customId)
    const menu = selectMenus.get(customId);
    if (!menu)
      return console.log(
        `There is no select menu found with the id of: ${customId}`
      );
    try {
      const guildPrefix = await getprefix.GET(interaction.guildId);
      await menu.execute(client, interaction,  makeIndex(interaction.values[0]));
    } catch (error) {
      console.log(error);
    }
  } else if (!interaction.isChatInputCommand()) {
    return console.log("is not chatinput quiting process");
  }
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
  con.initialize();
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
