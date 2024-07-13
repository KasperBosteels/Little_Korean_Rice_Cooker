require("dotenv").config();
const { EmbedBuilder } = require('discord.js');
module.exports = {
    execute() {
        return get();
    },
    makeEmbed(news) {
        return makeEmbed(news);
    },
    postNewsEmbed(embed, bot, channel) {
        PostNews(embed, bot, channel)
    }

};
function get() {
    let news = callApi();
    if (news == null) return;
    return news;
}

function PostNews(embed, bot, channel) {
    channel.send({ embeds: [embed] });
}

function callApi() {
    const apiUrl = 'https://newsdata.io/api/1/latest?apikey=' + process.env.NEWS_API_KEY;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
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
        .setAuthor({ name: news.creator[0], iconURL: news.source_icon, url: news.source_url })
        .setDescription(news.description)
        .addFields(
            { name: 'read here', value: news.content },
        )
        .setImage(news.image_url)
        .setTimestamp(news.pubDate)
    return newsEmbed;
}
