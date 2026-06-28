module.exports = {
    name: "get_current_date",
    definition: {
        type: "function",
        function: {
            name: "get_current_date",
            description: "Get the current date and time.",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    async execute(message, args) {
        const date = new Date().toLocaleString();
        console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested current date: ${date}`);
        return JSON.stringify({ date: date });
    }
};
