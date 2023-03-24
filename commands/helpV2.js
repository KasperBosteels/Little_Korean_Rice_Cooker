const getprefix = require("../DataHandlers/getprefixData").GET;
const GenerateEmbed = require("../Generators/GenerateSimpleEmbed").GenerateEmbed
module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "optional: [command name]\n optional: [category]",
  cooldown: 5,
  category: "general",
  perms: ["SendMessages", "ManageMessages"],
  userperms: [],
  async execute(client, message, args, con, options, button) {
    const prefix = await guildprefix(message.guildId);
    const embeds = await createCategoryEmbeds(prefix, client.commands);
    switch (args[0]) {
      case "general":
        return message.reply({embeds:[embeds[1]], ephemeral:true})
        case "fun":
          return message.reply({embeds:[embeds[2]], ephemeral:true})
          case "music":
        return message.reply({embeds:[embeds[3]], ephemeral:true})
        case "moderating":
        return message.reply({embeds:[embeds[4]], ephemeral:true})
        case "config":
        return message.reply({embeds:[embeds[5]], ephemeral:true})
      default:
        return message.reply({embeds:[embeds[0]],ephemeral:true})
    }
  }
}

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
