const ox = require("oxford-dictionary");
const Discord = require("discord.js");
const ID = process.env.OXFORD_ID;
const KEY = process.env.OXFORD_KEY;
const config = { app_id: ID, app_key: KEY, source_lang: "en-gb" };
const dict = new ox(config);
module.exports = {
  name: "oxford",
  description: "Oxford Dictionary.",
  cooldown: 3,
  usage: "<word> ",
  category: "fun",
  perms: ["SEND_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con) {
    if (!args[0]) return;
    let word = "";
    if (!args[1]) {
      word = args[0];
    } else {
      let argument_length = args.length;
      for (let i = 0; i < argument_length; i++) {
        if (!args[i + 1]) {
          word += args[i];
        } else {
          word += `${args[i]} `;
        }
      }
    }
    let lookup = dict.find(word);
    lookup
      .then(function (res) {
        let author = "Powered by Oxford Languages";
        let data = JSON.stringify(res, null, 4);
        let object = JSON.parse(data);
        return message.editReply({
          embeds: [makeEmbed(author, word, object, Discord)],
        });
      })
      .catch((err) => {
        message.reply({
          content: "I tried looking really hard but i didn't find that, sorry.",
        });
        console.error(err.message);
        console.log(
          derivative.length +
            synonyms.length +
            etymology.length +
            definitions.length +
            examples.length +
            94 +
            word.length
        );
      });
  },
};
function derivativeGET(object) {
  if (object.results[0].lexicalEntries[0].derivatives) {
    let derivative = " ";
    const derivative_length =
      object.results[0].lexicalEntries[0].derivatives.length;
    console.log(derivative_length);
    for (let i = 0; i < derivative_length; i++) {
      derivative += `\n${object.results[0].lexicalEntries[0].derivatives[i].id}`;
    }
    return derivative;
  }
}
function etymologyGet(object) {
  if (object.results[0].lexicalEntries[0].entries[0].etymologies) {
    let etymology = " ";
    const etymology_length =
      object.results[0].lexicalEntries[0].entries[0].etymologies.length;
    for (let o = 0; o < etymology_length; o++) {
      etymology += `\n${object.results[0].lexicalEntries[0].entries[0].etymologies[o]}.`;
    }
    return etymology;
  }
}
function defenitionGET(object) {
  if (object.results[0].lexicalEntries[0].entries[0].senses[0].definitions) {
    let definitions = " ";
    const definitions_length =
      object.results[0].lexicalEntries[0].entries[0].senses[0].definitions
        .length;
    for (let u = 0; u < definitions_length; u++) {
      definitions += `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].definitions[u]}.`;
    }
    return definitions;
  }
}
function exampleGET(object) {
  if (object.results[0].lexicalEntries[0].entries[0].senses[0].examples) {
    let examples = `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text}.`;
    const examples_length =
      object.results[0].lexicalEntries[0].entries[0].senses[0].examples.length;
    for (let h = 1; h < examples_length; h++) {
      if (
        object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h]
          .notes
      ) {
        examples += `\n__${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].notes[0].text}__ :\n${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].text}`;
      } else {
        examples += `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].text}.`;
      }
    }
    return examples;
  }
}
function synonymGET(object) {
  let synonyms = "";
  if (object.results[0].lexicalEntries[0].entries[0].senses[0].synonyms) {
    const synonyms_length =
      object.results[0].lexicalEntries[0].entries[0].senses[0].synonyms.length;
    for (let k = 0; k < synonyms_length; k++) {
      synonyms += `${object.results[0].lexicalEntries[0].entries[0].senses[0].synonyms[k].text}, `;
    }
    synonyms += `\n`;
  } else {
    synonyms = "No synonyms found.";
  }
  return synonyms;
}
function makeEmbed(author, word, object, Discord) {
  let embed = new Discord.MessageEmbed();
  embed.setAuthor(author);
  embed.setTitle(word);
  if (!object) {
    embed.setDescription("nothing found sorry");
    return embed;
  }
  let derivative = derivativeGET(object);
  let synonyms = synonymGET(object);
  let etymology = etymologyGet(object);
  let definitions = defenitionGET(object);
  let examples = exampleGET(object);
  if (!derivative) derivative = "none found";
  if (!etymology) etymology = "none found";
  if (!definitions) definitions = "none found";
  if (!examples) examples = "none found";
  embed.setDescription(
    `**derivatives**: ${derivative}\n**etymologies**: ${etymology}\n**definitions**: ${definitions}\n**examples**: ${examples}\n**synonyms**: ${synonyms}`
  );
  return embed;
}
