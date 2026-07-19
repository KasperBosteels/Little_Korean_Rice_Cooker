const phashOf = require("sharp-phash");
const fetch = require("node-fetch");
const ScamImage = require("../entity/ScamImage.js");

// In-memory cache of known scam-image phashes (64-char binary strings).
let cache = [];
// Hamming distance threshold on 64-bit pHash. <= 6 catches recompression/resizes
// while keeping false positives near zero. Don't push this above ~10.
const MAX_DISTANCE = 6;

function hamming(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
    return d;
}

module.exports = {
    MAX_DISTANCE,
    async execute(con) {
        try {
            const repo = con.getRepository(ScamImage);
            const rows = await repo.find();
            cache = rows.map((r) => r.phash);
            console.log("\x1b[32m", `scam images loaded: ${cache.length}`, "\x1b[0m");
        } catch (err) {
            console.error("\x1b[31m", "scamImages load failed:", err.message, "\x1b[0m");
        }
    },
    async hashUrl(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`fetch ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        return await phashOf(buf);
    },
    isScamHash(h) {
        if (!h || h.length !== 64) return false;
        return cache.some((c) => hamming(c, h) <= MAX_DISTANCE);
    },
    async addScamHash(con, hash, meta = {}) {
        const repo = con.getRepository(ScamImage);
        const row = repo.create({
            phash: hash,
            added_by: meta.added_by || null,
            source_url: meta.source_url || null,
            note: meta.note || null,
        });
        await repo.save(row);
        cache.push(hash);
    },
    GET_CACHE_SIZE() {
        return cache.length;
    },
};
