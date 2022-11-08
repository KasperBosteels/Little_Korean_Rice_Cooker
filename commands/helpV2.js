const botconfig = require("../auth.json");
const getprefix = require("../DataHandlers/getprefixData.js");
const { Permissions } = require("discord.js");
const dropdown = require("../dropdown");
const { GenerateEmbed } = require("../Generators/GenerateSimpleEmbed");
var prefix = "-";
//page settings
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
    prefix = await this.guildprefix(message.guild.id);

    //checks if a specific command query was asked if not send dm withh all commmands
    if (
      !args.length &&
      !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    ) {
      return message.reply({ embeds: [await firstPage(prefix)] });
    }
    if (
      !args.length &&
      message.guild.me.permissions.has([
        Permissions.Flags.SendMessages,
        Permissions.Flags.ManageMessages,
        Permissions.Flags.EmbedLinks,
      ])
    ) {
      //#region create command list in strings
      var commandlist = [];
      //for each command in commands folder get name description and category and usage
      client.commands.forEach((command) => {
        var constructor = {
          name: command.name,
          description: command.description,
          category: command.category,
          usage: command.usage,
        };
        //assign values to command list array
        commandlist.push(constructor);
      });
      //default markup
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

      dropdown.execute(client, message, response);
      //END UNSPECIFIED HELP RECUEST
      //if specific command was asked
    } else if (
      !args.length ||
      args[0] == "index" ||
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
      //#region repeated code
      var commandlist = [];

      //for each command in commands folder get name description and category and usage
      client.commands.forEach((command) => {
        var constructor = {
          name: command.name,
          description: command.description,
          category: command.category,
          usage: command.usage,
          perms: command.perms,
          userperms: command.userperms,
        };
        //assign values to command list array
        commandlist.push(constructor);
      });
      //default markup

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
      if (!args.length) {
        return message.reply({ embeds: response[0] });
      } else {
        switch (args[0]) {
          case "index":
            return message.reply({ embeds: [response[0]], ephemeral: true });
          case "1":
            return message.reply({ ephemeral: true, embeds: [response[0]] });
          case "general":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[1]],
            });
          case "2":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[1]],
            });
          case "fun":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[2]],
            });

          case "3":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[2]],
            });
          case "music" || "4":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[3]],
            });

          case "4":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[3]],
            });
          case "moderating":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[4]],
            });

          case "5":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[4]],
            });
          case "config":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[5]],
            });

          case "6":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[5]],
            });
          default:
            return message.channel.send({
              ephemeral: true,
              embeds: [response[0]],
            });
        }
      }
      //#endregion
    } else {
      const data = [];
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
        fal,
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
    `You can find more info about a commmand by using: ${prefix}help <command name>\n page:${i}/${pages}`,
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
      values: `\`\`\`${prefix}help config\`\`\``,
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
  let betterEmbed = GenerateEmbed("#00ff00", false, "page: 1/6", fields);
  return betterEmbed;
}
