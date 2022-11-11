const {
  SelectMenuOptionBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");
const getprefix = require("../DataHandlers/getprefixData").GET;
const GenerateEmbed =
  require("../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  name: "help",
  async execute(client, interaction, index = 0) {
    const prefix = await guildprefix(interaction.guildId);
    const menu = new SelectMenuBuilder()
      .setCustomId("help")
      .setPlaceholder("Select help topic.")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new SelectMenuOptionBuilder({
          label: "Home",
          description: "1. Home",
          value: "home",
        }),
        new SelectMenuOptionBuilder({
          label: "General",
          description: "2. General information.",
          value: "general",
        }),
        new SelectMenuOptionBuilder({
          label: "Fun",
          description: "3. Funny commands.",
          value: "fun",
        }),
        new SelectMenuOptionBuilder({
          label: "Music",
          description: "4. Musical commands.",
          value: "music",
        }),
        new SelectMenuOptionBuilder({
          label: "Moderating",
          description: "5. Commands for moderation purposes.",
          value: "moderating",
        }),
        new SelectMenuOptionBuilder({
          label: "Config",
          description: "6. Configuration of the bot?",
          value: "config",
        })
      );
    const embeds = await createCategoryEmbeds(prefix, client.commands);
    console.log(embeds[0]);
    await interaction.reply({
      content: "ㅤ",
      ephemeral: true,
      embeds: [embeds[0]],
      components: [new ActionRowBuilder().addComponents(menu)],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: "SelectMenu",
    });
    collector.on("collect", async (collected) => {
      console.log(collected);
      if (collected.componentType != "SelectMenu") return;
      await collected.deferUpdate();
      const value = collected.values[0];
      switch (value) {
        case "home":
          await collected.editReply({ embeds: [embeds[0]], ephemeral: true });
          break;
        case "general":
          await collected.editReply({ embeds: [embeds[1]], ephemeral: true });
          break;
        case "fun":
          await collected.editReply({ embeds: [embeds[2]], ephemeral: true });
          break;
        case "music":
          await collected.editReply({ embeds: [embeds[3]], ephemeral: true });
          break;
        case "moderating":
          await collected.editReply({ embeds: [embeds[4]], ephemeral: true });
          break;
        case "config":
          await collected.editReply({ embeds: [embeds[5]], ephemeral: true });
          break;
        default:
          await collected.editReply({ embeds: [embeds[0]], ephemeral: true });
          break;
      }
    });
  },
};
function MakeEmbed(content, prefix, i, pages = 6) {
  let FieldContent = [];
  content.forEach((field) => {
    FieldContent.push({
      name: field.name,
      value: `\`\`\`${prefix}${field.name}\n${field.description}\n${prefix}${field.name} ${field.usage}\`\`\``,
    });
  });
  let embed = GenerateEmbed(
    "#00ff00",
    false,

    {
      text: `You can find more info about a commmand by using: ${prefix}help <command name>\n page:${i}/${pages}`,
      url: null,
    },

    FieldContent
  );
  return embed;
}
function firstPage(prefix) {
  let fields = [
    { name: ":bookmark: index", value: `\`\`\`${prefix}help \`\`\`` },
    { name: ":thinking: general", value: `\`\`\`${prefix}help general\`\`\`` },
    { name: ":upside_down: fun", value: `\`\`\`${prefix}help fun\`\`\`` },
    { name: ":notes: music", value: `\`\`\`${prefix}help music\`\`\`` },
    {
      name: ":eyes: moderating",
      value: `\`\`\`${prefix}help moderating\`\`\``,
    },
    {
      name: ":screwdriver: config",
      value: `\`\`\`${prefix}help config\`\`\``,
    },
    {
      name: ":books: quick guide",
      value: `\`\`\`${prefix}help "command name"\nFor extra information about a command.\`\`\``,
    },
    {
      name: ":file_cabinet: remove my data/ignore me",
      value: `\`\`\`Your data is in no way traded or handed to third parties.\nyou can delete any stored data with the "${prefix}ignore-me" command(the bot will ignore you from this point on).\`\`\``,
    },
    {
      name: ":question: support",
      value: `If you need additional help, you can join **[the support server](https://discord.gg/y8QDMpuwZs)**.`,
    },
  ];
  let betterEmbed = GenerateEmbed(
    "#00ff00",
    false,
    { text: "page: 1/6", url: null },
    fields
  );
  return betterEmbed;
}
async function guildprefix(guildID) {
  let p = getprefix(guildID);
  if (p) {
    return p;
  } else {
    return botconfig.prefix;
  }
}
async function createCategoryEmbeds(prefix, commands) {
  var commandlist = [];
  //for each command in commands folder get name description and category and usage
  commands.forEach((command) => {
    var constructor = {
      name: command.name,
      description: command.description,
      category: command.category,
      usage: command.usage,
    };
    //assign values to command list array
    commandlist.push(constructor);
  });
  let general = [];
  let moderating = [];
  let fun = [];
  let debug = [];
  let music = [];
  let currency = [];
  //for the every command in the commandlist add values to a string from its category
  for (let i = 0; i < commandlist.length; i++) {
    const command = commandlist[i];
    if (command["category"] == "general") {
      general[i] = command;
    } else if (command["category"] == "moderating") {
      moderating[i] = command;
    } else if (command["category"] == "config") {
      debug[i] = command;
    } else if (command["category"] == "fun") {
      fun[i] = command;
    } else if (command["category"] == "music") {
      music[i] = command;
    } else if (command["category"] == "currency") {
      currency[i] = command;
    }
  }
  var response = [
    await MakeEmbed(general, prefix, 2),
    await MakeEmbed(fun, prefix, 3),
    await MakeEmbed(music, prefix, 4),
    await MakeEmbed(moderating, prefix, 5),
    await MakeEmbed(debug, prefix, 6),
  ];
  response.unshift(await firstPage(prefix));
  return response;
}
