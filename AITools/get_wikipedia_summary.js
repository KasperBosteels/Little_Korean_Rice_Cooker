module.exports = {
    name: "get_wikipedia_summary",
    definition: {
        type: "function",
        function: {
            name: "get_wikipedia_summary",
            description: "Fetch a summary of a topic from Wikipedia to provide factual information.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The topic to search for (e.g., 'Quantum Physics', 'South Korea')."
                    }
                },
                required: ["query"]
            }
        }
    },
    async execute(message, args) {
        try {
            const query = args.query;
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI searching Wikipedia for: ${query}`);
            
            // Wikipedia REST API endpoint for summaries
            const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`;
            
            const response = await fetch(apiUrl, {
                headers: {
                    'User-Agent': 'LittleKoreanRiceCookerDiscordBot/1.0 (Contact: via Discord)'
                }
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    return `Error: No Wikipedia page found for "${query}". Try a more general or specific term.`;
                }
                throw new Error(`Wikipedia API returned ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.type === 'disambiguation') {
                return `The term "${query}" is ambiguous on Wikipedia. Please be more specific. Possible interpretations: ${data.extract}`;
            }
            
            const result = {
                title: data.title,
                summary: data.extract,
                url: data.content_urls?.desktop?.page || data.canonicalurl,
                description: data.description
            };
            
            return JSON.stringify(result);
        } catch (err) {
            console.error("Tool get_wikipedia_summary failed:", err);
            return `Error: Failed to fetch information from Wikipedia. ${err.message}`;
        }
    }
};
