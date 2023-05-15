exports.up = function (knex) {
  return knex.schema.createTable("likedPets", (table) => {
    table.integer("petId").notNull();
    table.integer("userId").notNull();
    table.string("name").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("likedPets");
};
