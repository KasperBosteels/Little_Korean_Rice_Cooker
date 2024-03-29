const ox = require("oxford-dictionary");
const { Discord } = require("discord.js");
const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
const ID = process.env.OXFORD_ID;
const KEY = process.env.OXFORD_KEY;
const config = { app_id: ID, app_key: KEY, source_lang: "en-gb" };
const dict = new ox(config);
module.exports = {
  name: "oxford",
  description: "Find definitions from the oxford api",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "word",
      description: "The Word you want to look up",
      required: false,
    },
  ],

  async execute(client, interaction, con) {
    interaction.deferReply();
    const searchword = interaction.options.getString("word");

    let lookup = dict.find(searchword);
    lookup
      .then(function (res) {
        let author = "Powered by Oxford Languages";
        let data = JSON.stringify(res, null, 4);
        let object = JSON.parse(data);
        return interaction.editReply({
          embeds: [makeEmbed(author, searchword, object, Discord)],
        });
      })
      .catch((err) => {
        interaction.editReply({
          content: "I tried looking really hard but i didn't find that, sorry.",
        });
        if (err.message == undefined) {
          throw new Error("oxford did not find the word: " + searchword);
        } else {
          console.log(err);
          console.log(
            derivative.length +
              synonyms.length +
              etymology.length +
              definitions.length +
              examples.length +
              94 +
              word.length
          );
        }
      });
  },
};
function derivativeGET(object) {
  if (object.results[0].lexicalEntries[0].derivatives) {
    let derivative = " ";
    const derivative_length =
      object.results[0].lexicalEntries[0].derivatives.length;
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
  }
  return synonyms;
}
function makeEmbed(author, word, object, Discord) {
  let messageEmbed = G(
    "Random",
    "Nothing found sorry.",
    false,
    false,
    false,
    false,
    word,
    `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`
  );
  let derivative = derivativeGET(object);
  let synonyms = synonymGET(object);
  let etymology = etymologyGet(object);
  let definitions = defenitionGET(object);
  let examples = exampleGET(object);
  let completeDescription = "";
  if (derivative) {
    completeDescription += `**derivatives**: ${derivative}\n`;
  }
  if (etymology) {
    completeDescription += `**etymologies**: ${etymology}\n`;
  }
  if (definitions) {
    completeDescription += `**definitions**: ${definitions}\n`;
  }
  if (examples) {
    completeDescription += `**examples**: ${examples}\n`;
  }
  if (synonyms) {
    completeDescription += `**synonyms**: ${synonyms}`;
  }
  messageEmbed.setDescription(`${completeDescription}`);
  return messageEmbed;
}
