const login = require('../oxford.json');
const ox = require("oxford-dictionary");
const Discord = require("discord.js");
const ID = login.app_ID;
const KEY = login.app_KEY;
const config={app_id : ID,app_key: KEY,source_lang:"en-gb"};
const dict = new ox(config);
module.exports = {
	name: 'oxford',
	description: 'oxford dictionary',
	cooldown: 1,
	usage: '<a word> ',
    category: "fun",
    aliases:["odefine","define"],
	async execute(client,message, args,con) {
        if(!args[0])return;
        let word = "";
        if(!args[1]){
            word=args[0];
        }else{
         for (let i = 0; i < args.length; i++) {
            if(!args[i+1]){word += args[i];}else{
             word += `${args[i]} `;
            }
         }
    }
        let lookup = dict.find(word);
        lookup.then(function(res){
            let author =res.metadata.provider;
            let data=(JSON.stringify(res,null,4));
            let object = JSON.parse(data);
            return message.channel.send(makeEmbed(author,word,object,Discord));
        },
        function(err){
            console.error(err.message);
        });
    },
};
function derivativeGET(object){
    if(object.results[0].lexicalEntries[0].derivatives){
        let derivative =" ";
        for (let i = 0; i < object.results[0].lexicalEntries[0].derivatives.length; i++) {
            derivative += `\n${object.results[0].lexicalEntries[0].derivatives[i].id}`;}
        return derivative;
}}
function etymologyGet(object){
    if(object.results[0].lexicalEntries[0].entries[0].etymologies){
        let etymology=" ";
        for (let o = 0; o < object.results[0].lexicalEntries[0].entries[0].etymologies.length; o++) {
            etymology += `\n${object.results[0].lexicalEntries[0].entries[0].etymologies[o]}.`;
        }
        return etymology;
}}
function defenitionGET(object){
    if(object.results[0].lexicalEntries[0].entries[0].senses[0].definitions){
    let definitions=" ";
    for (let u = 0; u < object.results[0].lexicalEntries[0].entries[0].senses[0].definitions.length; u++) {
    definitions+= `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].definitions[u]}.`;
}
return definitions;
}}
function exampleGET(object){
    if(object.results[0].lexicalEntries[0].entries[0].senses[0].examples){
    let examples = `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text}.`;
    for (let h = 1; h < object.results[0].lexicalEntries[0].entries[0].senses[0].examples.length; h++) {
    if(object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].notes){
        examples += `\n__${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].notes[0].text}__ :\n${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].text}`;
    }else{
        examples += `\n${object.results[0].lexicalEntries[0].entries[0].senses[0].examples[h].text}.`;
    }}
    return examples;
}
}
function synonymGET(object){
    let synonyms = "";
    if(object.results[0].lexicalEntries[0].entries[0].senses[0].synonyms){
    
        for (let k = 0; k < object.results[0].lexicalEntries[0].entries[0].senses[h].synonyms.length; k++) {
            synonyms +=`${object.results[0].lexicalEntries[0].entries[0].senses[h].synonyms[0].text}, `;
        }
        
    
        synonyms +=`\n`;
    
    }else {synonyms = "no synonyms found."}
    return synonyms;
}
function makeEmbed(author,word,object,Discord){
let embed = new Discord.MessageEmbed();
embed.setAuthor(author);
embed.setTitle(word);
if(!object){embed.setDescription("nothing found sorry"); return embed;}
let derivative =derivativeGET(object);
let synonyms =synonymGET(object);
let etymology=etymologyGet(object)
let definitions=defenitionGET(object);
let examples=exampleGET(object);
if(!derivative)derivative = 'none found';
if(!etymology)etymology = 'none found';
if(!definitions)definitions = 'none found';
if(!examples)examples = 'none found';
embed.setDescription(`**derivatives**: ${derivative}\n**etymologies**: ${etymology}\n**definitions**: ${definitions}\n**examples**: ${examples}\n**synonyms**: ${synonyms}`);
return embed
}