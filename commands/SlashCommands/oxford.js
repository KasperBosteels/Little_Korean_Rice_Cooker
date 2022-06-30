const { SlashCommandBuilder } = require("@discordjs/builders");
const ox = require("oxford-dictionary");
const Discord = require("discord.js");
const ID = process.env.OXFORD_ID;
const KEY = process.env.OXFORD_KEY;
const config = { app_id: ID, app_key: KEY, source_lang: "en-gb" };
const dict = new ox(config);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ox")
    .setDescription("Definitions from the oxford api")
    .setDefaultPermission(true)
    .addStringOption((option) =>
      option.setName("word").setDescription("The word you want to look up.")
    ),

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
  embed.setDescription(`${completeDescription}`);
  return embed;
}
