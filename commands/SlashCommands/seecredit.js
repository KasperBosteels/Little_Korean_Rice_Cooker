const { Discord } = require("discord.js");
const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const credit = require("../../DataHandlers/socialCredit");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  name: "credit",
  description: "Look at your own or someone elses social credit.",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["ModerateMembers", "SendMessages", "ViewChannel"],
  dmPermission: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      required: false,
      name: "user",
      description: "Social credit of a user",
    },
  ],
  async execute(client, interaction, con) {
    await interaction.deferReply({ ephemeral: true });
    let user = await interaction.options.getUser("user");
    if (user == undefined) {
      user = interaction.user;
    }

          let  SCS =1000
          SCS =await credit.GETSCORE(con,user.id)
          
        //return with embed message
        return interaction.editReply({
          embeds: [makeEmbed( user, SCS)],
          ephemeral: true,
        });
  },
};

function makeEmbed( user, score) {
  
  let socialcreditlevel = "normal";
  if (score < 500)
    socialcreditlevel = `too low to use commands <:cookerangry:927889358231597127> `;
  if (score < 1000) socialcreditlevel = `bad <:cookersad:927889427500499006> `;
  if (score >= 1500 && score <= 1999)
    socialcreditlevel = `good <:cooker:927889501295095879> `;
  if (score >= 2000 && score <= 2999) socialcreditlevel = "very good";
  if (score >= 3000 && score <= 3999) socialcreditlevel = "outstanding!";
  if (score >= 4000) socialcreditlevel = "**AMAZING**";
  const fields = [
    {
      name:"user",
      value: `\`\`\`${user.username}#${user.discriminator}\`\`\``,
      inline: true
    },
    {
      name:"id",
      value: `\`\`\`${user.id}\`\`\``,
      inline: true
    },{
      name:"social credit",
      value:`${score} this score is ${socialcreditlevel}`,
      inline:true
    }
  ]
  const E = G("#00ff00",false,false,fields,true,false,false,false, user.avatarURL({ dynamic: true, format: "png", size: 64 }))
  return E;
}
