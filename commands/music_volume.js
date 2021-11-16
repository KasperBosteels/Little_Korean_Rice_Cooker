const music = require("@koenie06/discord.js-music");
const { parse } = require("dotenv");
const score = require("../socalCredit");
module.exports = {
  name: "volume",
  description: "set the volume.",
  cooldown: 1,
  usage: " a number between 0 and 100",
  category: "fun",
  async execute(client, message, args, con) {
    let volume = parseInt(args[0]);
    if (volume < 0 || volume > 100 || !args[0])
      return message.reply(
        "Don't forget you need to give me a number between 0 and 100."
      );

    music.volume({ interaction: message, volume: volume });
    score.ADD(con, 1, message.author.id);
  },
};
/*

exports.volume = async (options = {}) => {

    const { interaction, volume } = options;
    if(!interaction) throw new Error(`INVALID_INTERACTION: There is no valid CommandInteraction provided.`);
    if(!volume || !Number.isInteger(volume) || volume > 100) throw new Error(`INVALID_VOLUME: There is no valid Volume Integer provided or the number is higher than 100.`);
    if(!activeSongs.has(interaction.guild.id) || !activeSongs.get(interaction.guild.id)?.connection || !activeSongs.get(interaction.guild.id)?.player) throw new Error(`NO_MUSIC: There is no music playing in that server.`);

    const fetchedData = await activeSongs.get(interaction.guild.id);

    fetchedData.resource.volume.setVolumeLogarithmic(volume/100)

};

async function playSong(data, interaction) {

    let resource = await createAudioResource(ytdl(data.queue[0].url, { filter: 'audioonly',highWaterMark: 1<<25, quality:'highestaudio'}), { 
        inputType: StreamType.Arbitrary,
        inlineVolume: true
    });

    const player = createAudioPlayer();
    player.play(resource);
    data.player = player;
    data.resource = resource
    data.dispatcher = await data.connection.subscribe(player);
    data.dispatcher.guildId = data.guildId;
    resource.volume.setVolumeLogarithmic(1);
    if(data.queue[0].info.extra.type === 'playlist') {
        event.emit('playList', data.queue[0].channel, data.queue[0].info.extra.playlist, data.queue[0].info, data.queue[0].requester);
    } else {
        event.emit('playSong', data.queue[0].channel, data.queue[0].info, data.queue[0].requester);
    }

    player.on(AudioPlayerStatus.Idle, async () => {

        finishedSong(player, data.connection, data.dispatcher, interaction);

    })

    player.on('error', err => console.log(err))

};

*/
