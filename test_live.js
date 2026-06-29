const sentience = require('./sentience.js');
const { Collection } = require('discord.js');

async function test() {
    const fs = require('fs');
    fs.writeFileSync('./jsonFiles/llamahistory.json', '[]');
    
    const mockClient = {
        user: { id: 'bot_id', tag: 'Little_Korean_Rice_Cooker#0791', username: 'Little_Korean_Rice_Cooker' },
        commands: new Collection()
    };

    const mockMessage = {
        content: 'Hello, how are you?',
        author: { id: 'user_123', username: 'creamy3434' },
        mentions: { 
            has: () => true,
            users: new Collection([['bot_id', mockClient.user]])
        },
        guild: { id: '927741496738869298' },
        channel: { 
            id: 'channel_123', 
            type: 0,
            sendTyping: async () => console.log('[Mock] Typing...'),
            send: async (msg) => console.log('[Mock Send]', msg),
        },
        reply: async (msg) => console.log('[Mock Reply]', msg),
        reference: null
    };

    const aiModelHandler = require('./DataHandlers/aiModelHandler.js');
    await aiModelHandler.set('cookerv4:latest');
    const sentience = require('./sentience.js');

    console.log('--- Starting Sentience Test (cookerv4) ---');
    try {
        await sentience.live(mockMessage, mockClient);
    } catch (err) {
        console.error('Test failed:', err);
    }
    console.log('--- Test Finished ---');
}

test();
