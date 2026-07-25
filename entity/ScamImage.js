var EntitySchema = require("typeorm").EntitySchema;
module.exports = new EntitySchema({
    name: "ScamImage",
    tableName: "scam_images",
    columns: {
        scam_image_id: {
            primary: true,
            generated: true,
            type: "int",
            name: "scam_image_id",
        },
        phash: {
            type: "char",
            length: 64,
            nullable: false,
            name: "phash",
        },
        added_by: {
            type: "varchar",
            length: 32,
            nullable: true,
            name: "added_by",
        },
        source_url: {
            type: "text",
            nullable: true,
            name: "source_url",
        },
        note: {
            type: "varchar",
            length: 255,
            nullable: true,
            name: "note",
        },
        created_at: {
            type: "datetime",
            nullable: false,
            createDate: true,
            name: "created_at",
        },
        detection_count: {
            type: "int",
            nullable: false,
            default: 0,
            name: "detection_count",
        },
        last_detected_at: {
            type: "datetime",
            nullable: true,
            name: "last_detected_at",
        },
    },
    indices: [
        { name: "idx_scam_phash", columns: ["phash"] },
    ],
});
