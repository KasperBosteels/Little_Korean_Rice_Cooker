var EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
   name: "Swearword",
   tableName: "Swearwords",
   columns: {
      word: {
         primary: true,
         name: "word",
         type: "varchar",
         generated: false,
         length: 50
      }
   }
})