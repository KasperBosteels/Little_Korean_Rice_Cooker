const phashOf = require("sharp-phash");
const fetch = require("node-fetch");
const ScamImage = require("../entity/ScamImage.js");

// In-memory cache of known scam-image phashes.
// Each entry: { id, phash, detection_count }
let cache = [];
// Hamming distance threshold on 64-bit pHash. <= 6 catches recompression/resizes
// while keeping false positives near zero. Don't push this above ~10.
const MAX_DISTANCE = 6;

function hamming(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
    return d;
}

function findMatch(h) {
    if (!h || h.length !== 64) return null;
    let best = null;
    let bestDist = MAX_DISTANCE + 1;
    for (const c of cache) {
        const d = hamming(c.phash, h);
        if (d <= MAX_DISTANCE && d < bestDist) {
            best = c;
            bestDist = d;
        }
    }
    return best;
}

module.exports = {
    MAX_DISTANCE,
    async execute(con) {
        try {
            const repo = con.getRepository(ScamImage);
            const rows = await repo.find();
            cache = rows.map((r) => ({
                id: r.scam_image_id,
                phash: r.phash,
                detection_count: r.detection_count || 0,
            }));
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
        return findMatch(h) !== null;
    },
    findScamMatch(h) {
        return findMatch(h);
    },
    async recordDetection(con, entry) {
        if (!entry) return;
        entry.detection_count = (entry.detection_count || 0) + 1;
        try {
            const repo = con.getRepository(ScamImage);
            await repo.update(
                { scam_image_id: entry.id },
                { detection_count: entry.detection_count, last_detected_at: new Date() }
            );
        } catch (err) {
            console.error("\x1b[31m", "scamImages recordDetection failed:", err.message, "\x1b[0m");
        }
    },
    async addScamHash(con, hash, meta = {}) {
        const repo = con.getRepository(ScamImage);
        const row = repo.create({
            phash: hash,
            added_by: meta.added_by || null,
            source_url: meta.source_url || null,
            note: meta.note || null,
            detection_count: 0,
        });
        await repo.save(row);
        cache.push({ id: row.scam_image_id, phash: hash, detection_count: 0 });
    },
    GET_CACHE_SIZE() {
        return cache.length;
    },
    GET_CACHE() {
        return cache;
    },
};
