const { PermissionFlagsBits } = require("discord.js");
const scam = require("./scamImages.js");

// Bans cross-server only if the account joined that guild within this window.
const JOIN_WINDOW_MS = 48 * 60 * 60 * 1000;

function collectImageUrls(msg) {
    const urls = [];
    for (const a of msg.attachments.values()) {
        if ((a.contentType || "").startsWith("image/")) urls.push(a.url);
    }
    for (const e of msg.embeds) {
        if (e.image && e.image.url) urls.push(e.image.url);
        if (e.thumbnail && e.thumbnail.url) urls.push(e.thumbnail.url);
    }
    return urls;
}

async function banAcrossGuilds(client, userId, reason) {
    const banned = [];
    for (const [, guild] of client.guilds.cache) {
        try {
            const me = guild.members.me;
            if (!me || !me.permissions.has(PermissionFlagsBits.BanMembers)) continue;

            const member = await guild.members.fetch(userId).catch(() => null);
            if (!member) continue;
            if (!member.bannable) continue;
            if (!member.joinedAt) continue;
            if (Date.now() - member.joinedAt.getTime() > JOIN_WINDOW_MS) continue;

            await guild.members.ban(userId, {
                reason,
                deleteMessageSeconds: 60 * 60 * 24,
            });
            banned.push(guild.id);
        } catch (e) {
            console.error("\x1b[31m", `[scam] ban failed in ${guild.id}:`, e.message, "\x1b[0m");
        }
    }
    return banned;
}

async function checkMessage(message, client, con) {
    try {
        if (!message.guild || message.author.bot) return;
        const urls = collectImageUrls(message);
        if (urls.length === 0) return;

        for (const url of urls) {
            let h;
            try {
                h = await scam.hashUrl(url);
            } catch {
                continue;
            }
            const match = scam.findScamMatch(h);
            if (match) {
                await scam.recordDetection(con, match);
                const reason = `Scam image auto-detected (msg ${message.id})`;
                await message.delete().catch(() => {});
                const banned = await banAcrossGuilds(client, message.author.id, reason);
                console.log(
                    "\x1b[31m",
                    `[scam] banned ${message.author.tag} in ${banned.length} guild(s) — hash #${match.id} hits: ${match.detection_count}`,
                    "\x1b[0m"
                );
                return;
            }
        }
    } catch (err) {
        console.error("\x1b[31m", "scamEnforcer error:", err.message, "\x1b[0m");
    }
}

module.exports = { checkMessage, banAcrossGuilds, JOIN_WINDOW_MS };
