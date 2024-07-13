require("dotenv").config();
const { EmbedBuilder } = require('discord.js');
module.exports = {
    async execute() {
        
        return await callApi();
    },
    makeEmbed(news) {
        return makeEmbed(news);
    },
    postNewsEmbed(embed, client, channel) {
        PostNews(embed, client, channel)
    }

};
async function PostNews(embed, client, channel) {
    let newschannel = await client.channels.cache.get(channel);
    console.log(newschannel);
    console.log(channel);
    newschannel.send({ embeds: [embed] });
}

async function callApi() {
    const apiUrl = 'https://newsdata.io/api/1/latest?apikey=' + process.env.NEWS_API_KEY+"&language=en,jp,lb&image=1";
   return await  fetch(apiUrl)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.results;

        })
        .catch(error => {
            console.error('Error:', error);
        });

}


function makeEmbed(news) {
    const newsEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(news.title)
        .setURL(news.link)
        .setAuthor({ name: null, iconURL: news.source_icon, url: news.source_url })
        .setDescription(news.description)
        .setImage(news.image_url)
        .setTimestamp()
    return newsEmbed;
}
