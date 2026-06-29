require("dotenv").config();

async function callOllama(model, messages, tools = null, options = null) {
    const body = {
        model: model,
        messages: messages,
        stream: false,
        keep_alive: "48h"
    };
    
    if (tools && tools.length > 0) {
        body.tools = tools;
    }

    if (options && Object.keys(options).length > 0) {
        body.options = options;
    }

    if (tools && tools.length > 0) {
        console.log(`\x1b[36m[Ollama Tools]\x1b[0m Providing ${tools.length} tools: ${tools.map(t => t.function.name).join(", ")}`);
    }

    console.log(`\x1b[36m[Ollama Request]\x1b[0m Model: ${model}, Messages: ${messages.length}`);

    const response = await fetch(process.env.LLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        let errorDetail = "";
        try {
            const errorJson = await response.json();
            errorDetail = errorJson.error || JSON.stringify(errorJson);
        } catch (e) {
            errorDetail = await response.text().catch(() => "Unknown error");
        }
        throw new Error(`Ollama error: ${response.statusText} - ${errorDetail}`);
    }

    return await response.json();
}

module.exports = { callOllama };
