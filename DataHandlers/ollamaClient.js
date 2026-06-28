require("dotenv").config();

async function callOllama(model, messages, tools = null) {
    const body = {
        model: model,
        messages: messages,
        stream: false,
        keep_alive: "48h"
    };
    
    if (tools && tools.length > 0) {
        body.tools = tools;
    }

    const response = await fetch(process.env.LLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
    }

    return await response.json();
}

module.exports = { callOllama };
