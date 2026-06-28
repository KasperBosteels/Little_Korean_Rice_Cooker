---
sessionId: session-260628-020654-1b4u
---

# Requirements

### Overview & Goals
The goal is to enhance the AI's capabilities by providing it with more tools to interact with the bot and the environment. This includes tools for self-identification, command discovery, date/time awareness, and the ability to execute certain commands autonomously. Additionally, the bot's production environment (Docker) will be rebuilt and restarted to apply all recent changes and ensure the updated version is online, while maintaining data persistence.

### Scope
- **In Scope**:
    - Fixing the `CannotDetermineEntityError` in the `ai` command.
    - Adding tools for bot info, command listing, and current date.
    - Adding a tool to execute "fun" category commands.
    - Modifying `bot.js` and `sentience.js` to support these new capabilities.
    - Rebuilding and restarting the Docker environment to apply all recent updates.
- **Out of Scope**:
    - Adding tools for destructive or administrative commands (e.g., banning, deleting channels).
    - Modifying non-AI related command logic.
    - Migrating or altering the existing MariaDB database structure.

# Technical Design

### Current Implementation
The AI currently only has one tool: `get_channel_history`. It is triggered by mentions, replies, or a 1-in-1000 chance on any message. It does not have access to the database connection or the full list of bot commands.

### Proposed Changes

#### 1. Fix AI Command Bug
The `ai` command (prefix and slash versions) fails with `CannotDetermineEntityError` because `con.manager.save(g)` is called without specifying the entity name for a plain object literal.
- Update `commands/ai.js` and `commands/SlashCommands/ai.js` to use `await con.manager.save("Guild", g)`.
- Replace `.then()` promise chains with `await` for improved error handling and readability.

#### 2. Bot.js Integration
Update `bot.js` to pass the `con` (DataSource) object to `sentience.live`.

```javascript
// bot.js
if (!prefixcheck.execute(Interaction)) {
    try {
        await sentience.live(Interaction, client, con); // Pass con here
    } catch (eve) {
        console.error(eve);
    }
    return;
}
```

#### 3. Sentience.js Enhancements
Update `sentience.js` with new tool definitions and a robust tool-call handler.

**New Tools:**
- `get_bot_info`: Returns name, version, and description from `package.json`.
- `get_commands`: Returns a list of all commands (name, description, category, usage).
- `get_current_date`: Returns the current date and time.
- `execute_command`: Allows the AI to run a command. Restricted to the `fun` category for safety.

**Updated Signatures:**
- `module.exports.live(message, client, con)`
- `async function live(message, shouldReply, con)`

#### 4. Data Models / Contracts
**Tool Call Handler Update:**
The loop in `live()` will be expanded to handle the new tool names and route them to their respective helper functions.

**Execute Command Logic:**
```javascript
async function executeCommand(commandName, argsArray, message, client, con) {
    const command = client.commands.get(commandName) || 
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return "Command not found.";
    
    if (command.category !== "fun") {
        return "I am only allowed to execute fun commands on my own.";
    }

    try {
        await command.execute(client, message, argsArray, con);
        return `Successfully executed ${commandName}.`;
    } catch (err) {
        return `Error executing command: ${err.message}`;
    }
}
```

### Risks & Mitigations
- **Recursive Loops**: The AI might try to execute commands in a loop. *Mitigation*: The tool-call loop is limited to 2 iterations, and commands are restricted to the "fun" category which usually doesn't trigger the AI.
- **Permission Escalation**: The AI might try to run admin commands. *Mitigation*: Strictly enforce that only "fun" category commands can be executed via the tool.
- **Database Downtime**: Restarting the Docker containers will cause brief downtime. *Mitigation*: The `db` service uses a healthcheck to ensure the bot only starts when the database is ready. Named volumes ensure no data is lost during the restart.

### Docker Deployment
The project uses `docker-compose` to manage the bot and its MariaDB database.
- **Persistence**: The `db` service uses a named volume `db_data` mapped to `/var/lib/mysql`. Rebuilding the image or recreating the container will NOT affect the data stored in this volume.
- **Build Process**: `docker compose up --build -d` will be used to rebuild the bot image from the local `Dockerfile` and restart the services in the background.

# Delivery Steps

###   Step 1: Fix AI command bug
Identify and resolve the database saving issue in both the prefix and slash versions of the `ai` command.
- Modify `commands/ai.js` and `commands/SlashCommands/ai.js`.
- Use `await con.manager.save("Guild", g)` to ensure the entity is correctly recognized and saved.
- Ensure `ensureRegistered.ensureGuild(con, message.guild)` is called before database modifications.

###   Step 2: Pass database connection to sentience.js
Update `bot.js` to pass the database connection `con` to `sentience.live` so that the AI can execute commands that require database access.
- Modify the `MessageCreate` event handler in `bot.js`.
- Update the call to `await sentience.live(Interaction, client, con)`.

###   Step 3: Add new tool definitions to sentience.js
Define the new tools in `sentience.js` so the AI knows it can use them.
- Add `get_bot_info`, `get_commands`, `get_current_date`, and `execute_command` to the `tools` array.
- Provide clear descriptions and parameter definitions for each tool.

###   Step 4: Implement tool handlers in sentience.js
Implement the logic for the new tools in `sentience.js`.
- Update the `live` function to handle the new tool calls in the tool-calling loop.
- Implement `getBotInfo()` to return bot identity details.
- Implement `getCommands()` to return a list of available bot commands.
- Implement `getCurrentDate()` to return the current date and time.
- Implement `executeCommand()` to safely run "fun" commands on behalf of the AI.

###   Step 5: Verification and Testing
Perform a syntax check and verify that the AI can correctly identify and call the new tools.
- Run `node -c` on modified files.
- Ensure tool calls are correctly processed and results are sent back to the LLM.

###   Step 6: Rebuild and restart Docker containers
Apply all recent code changes to the production environment.
- Run `docker compose up --build -d` to rebuild the bot image and restart the services.
- This ensures the latest version of `sentience.js`, `bot.js`, and the commands are running.
- Verify that the services are running correctly using `docker compose ps` and `docker compose logs`.