const {
    ApplicationCommandType,
    ApplicationCommandOptionType,
    PermissionsBitField,
    MessageFlags,
} = require("discord.js");
const scam = require("../../DataHandlers/scamImages.js");
const ScamImage = require("../../entity/ScamImage.js");

module.exports = {
    name: "scam",
    description: "Manage the cross-server scam-image hash list.",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: [PermissionsBitField.Flags.BanMembers],
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "add",
            description: "Add an image to the known-scam list.",
            options: [
                {
                    type: ApplicationCommandOptionType.Attachment,
                    name: "image",
                    description: "The scam image to fingerprint.",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "note",
                    description: "Optional note (e.g. 'fake steam gift').",
                    required: false,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "test",
            description: "Test whether an image matches any known scam hash.",
            options: [
                {
                    type: ApplicationCommandOptionType.Attachment,
                    name: "image",
                    description: "The image to test.",
                    required: true,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "list",
            description: "Show how many scam hashes are currently loaded.",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "remove",
            description: "Remove a scam hash by its id.",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "id",
                    description: "The scam_image_id to remove.",
                    required: true,
                },
            ],
        },
    ],
    async execute(client, interaction, con) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                content: "You need the Ban Members permission to use this.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const sub = interaction.options.getSubcommand();
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        if (sub === "add") {
            const att = interaction.options.getAttachment("image");
            const note = interaction.options.getString("note");
            if (!att || !(att.contentType || "").startsWith("image/")) {
                return interaction.editReply({ content: "That doesn't look like an image." });
            }
            try {
                const h = await scam.hashUrl(att.url);
                await scam.addScamHash(con, h, {
                    added_by: interaction.user.id,
                    source_url: att.url,
                    note,
                });
                return interaction.editReply({
                    content: `Added scam hash \`${h.slice(0, 16)}…\`. Total loaded: ${scam.GET_CACHE_SIZE()}.`,
                });
            } catch (err) {
                return interaction.editReply({ content: `Failed to hash image: ${err.message}` });
            }
        }

        if (sub === "test") {
            const att = interaction.options.getAttachment("image");
            if (!att || !(att.contentType || "").startsWith("image/")) {
                return interaction.editReply({ content: "That doesn't look like an image." });
            }
            try {
                const h = await scam.hashUrl(att.url);
                const match = scam.findScamMatch(h);
                return interaction.editReply({
                    content: match
                        ? `MATCH — this image matches known scam hash #${match.id} (pHash \`${h.slice(0, 16)}…\`). Detected ${match.detection_count} time(s) so far.`
                        : `No match. pHash \`${h.slice(0, 16)}…\` (threshold ${scam.MAX_DISTANCE}).`,
                });
            } catch (err) {
                return interaction.editReply({ content: `Failed to hash image: ${err.message}` });
            }
        }

        if (sub === "list") {
            const entries = scam.GET_CACHE();
            const total = entries.reduce((s, e) => s + (e.detection_count || 0), 0);
            const top = [...entries]
                .sort((a, b) => (b.detection_count || 0) - (a.detection_count || 0))
                .slice(0, 10);
            const lines = top.map(
                (e) => `#${e.id} — \`${e.phash.slice(0, 16)}…\` — hits: ${e.detection_count || 0}`
            );
            const body = lines.length ? `\n\nTop hashes by detections:\n${lines.join("\n")}` : "";
            return interaction.editReply({
                content: `Currently tracking ${entries.length} scam image hash(es). Total detections: ${total}.${body}`,
            });
        }

        if (sub === "remove") {
            const id = interaction.options.getInteger("id");
            const repo = con.getRepository(ScamImage);
            const row = await repo.findOneBy({ scam_image_id: id });
            if (!row) {
                return interaction.editReply({ content: `No scam hash with id ${id}.` });
            }
            await repo.remove(row);
            await scam.execute(con); // reload cache
            return interaction.editReply({
                content: `Removed scam hash #${id}. Total loaded: ${scam.GET_CACHE_SIZE()}.`,
            });
        }
    },
};
