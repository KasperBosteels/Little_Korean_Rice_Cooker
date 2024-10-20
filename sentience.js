const dataHandler = require("./DataHandlers/llamaMessageHistory.js");
require("dotenv").config();

module.exports = {
    async live(message, client) {
        if (process.env.LLAMA_URL == "" || process.env.LLAMA_URL == undefined || process.env.LLAMA_URL == null) {
            return;
        }
        if (message.mentions.has(client.user) || oneInTwenty() || (!message.mentions.has(client.user)  && oneInFifty())) {
            return await live(message);
        }
    },
};
async function live(message) {
    await message.channel.sendTyping();
    let m = message.content;
    message.mentions.users.forEach(mention => {
        m = m.replace(`<@${mention.id}>`, mention.username);
    });
    dataHandler.ADD(message.author.id, message.guild.id, "user", m);
    let body = {
        "model": "cooker",
        "messages": dataHandler.GET(message.author.id, message.guild.id),
        "stream": false,
        "keep_alive": "1h"
    }
    return await fetch(process.env.LLAMA_URL, {
        method: "POST",
        body: JSON.stringify(body)
    })
        .then(async (response) => {
            if (!response.ok) {
                let r = await response.json();
                throw new Error('Network response was not ok');
            }
            let result = await response.json()
            dataHandler.ADD(message.author.id, message.guild.id, result.message.role, result.message.content)
            if (oneInTwenty()) {
                message.reply({ content: result.message.content })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                message.channel.send({ content: result.message.content })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
}
function oneInTwenty() {
    return Math.random() < 1 / 20;
}

function oneInFifty(){
    return Math.random() < 1 / 50;

}