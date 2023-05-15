exports.up = function (knex) {
  return knex.schema.createTable("pet_activities", (table) => {
    table.increments("actId").primary();
    table.integer("petId").notNull();
    table.integer("userId").notNull();
    table.string("adoptionStatus").notNull();
    table.string("active").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pet_activities");
};
