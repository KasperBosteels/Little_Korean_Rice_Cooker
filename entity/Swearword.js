var EntityShema = require("typeorm").EntitySchema
module.exports = new EntityShema({
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