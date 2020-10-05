const config = require('./auth.json');

module.exports = {
    execute(message){
        return check(message)
    }
};
function check(message) {
    if (!message.content.startsWith(config.prefix) || message.author.bot) {return false;}else return true;}