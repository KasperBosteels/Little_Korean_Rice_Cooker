const botconfig = require("../auth.json");
const getprefix = require("../DataHandlers/getprefixData.js");
const dropdown = require("../SelectMenus/HelpSelectMenu");
const { GenerateEmbed } = require("../Generators/GenerateSimpleEmbed");
const { PermissionsBitField } = require("discord.js");
var prefix = "-";
module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "optional: [command name]\n optional: [category]",
  cooldown: 5,
  category: "general",
  perms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con, options, button) {
    prefix = await this.guildprefix(message.guild.id);
    if (
      !args[0] &&
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    ) {
      return message.channel.send({ embeds: [await firstPage(prefix)] });
    } else if (
      !args.length &&
      message.guild.members.me.permissions.has([
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.ManageMessages,
        PermissionsBitField.Flags.EmbedLinks,
        PermissionsBitField.Flags.ReadMessageHistory,
      ])
    ) {
      dropdown.execute(client, message);
    } else if (
      args[0] &&
      message.guild.members.me.permissions.has([
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.ManageMessages,
        PermissionsBitField.Flags.EmbedLinks,
        PermissionsBitField.Flags.ReadMessageHistory,
      ])
    ) {
      if (
        (args.length == 1 && args[0] == "index") ||
        args[0] == "general" ||
        args[0] == "fun" ||
        args[0] == "music" ||
        args[0] == "config" ||
        args[0] == "moderating" ||
        args[0] == 1 ||
        args[0] == 2 ||
        args[0] == 3 ||
        args[0] == 4 ||
        args[0] == 5 ||
        args[0] == 6
      ) {
        switch (args[0].toLowerCase()) {
          case "index" || 1:
            dropdown.execute(client, message);
            break;
          case "general" || 2:
            dropdown.execute(client, message, 2);
            break;
          case "fun" || 3:
            dropdown.execute(client, message, 3);
            break;
          case "music" || 4:
            dropdown.execute(client, message, 4);
            break;
          case "config" || 5:
            dropdown.execute(client, message, 5);
            break;
          case "moderating" || 6:
            dropdown.execute(client, message, 6);
            break;
          default:
            dropdown.execute(client, message);
            break;
        }
      }
    } else if (
      !args.length &&
      !message.guild.members.me.permissions.has([
        permissions.Flags.ReadMessageHistory,
      ])
    ) {
      //return await dropdown.execute(client,message)
      return await message.author.send({ embeds: [firstPage(prefix)] });
    } else {
      const { commands } = message.client;
      //get the command that was mentioned check all the names and aliases
      const name = args[0].toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      //if there is no command found return
      if (!command) {
        return message.reply({
          content: `That was not a valid command!\ntype: "${prefix}help" for all commands.`,
          ephemeral: true,
        });
      }

      //push values to data array
      let commandFields = [
        { name: "**Description**", value: command.description },
        {
          name: "**usage**",
          value: `${prefix}${command.name} ${command.usage}`,
        },
        { name: "**cooldown**", value: `${command.cooldown || 3} second(s)` },
      ];
      if (command.perms.length > 0)
        commandFields.push({
          name: "```bot permissions```",
          value: `\`\`\`${command.perms}\`\`\``,
        });
      if (command.userperms.length > 0)
        commandFields.push({
          name: `\`\`\`user permissions\`\`\``,
          value: `\`\`\`${command.userperms}\`\`\``,
        });
      let betterEmbed = GenerateEmbed(
        "#00ff00",
        `**aliases:** ${command.aliases}`,
        false,
        commandFields,
        false,
        false,
        `**${command.name}**`
      );
      return message.reply({ embeds: [betterEmbed], ephemeral: true });
    }
  },
  guildprefix(guildID) {
    let p = getprefix.GET(guildID);
    if (p) {
      return p;
    } else {
      return botconfig.prefix;
    }
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
