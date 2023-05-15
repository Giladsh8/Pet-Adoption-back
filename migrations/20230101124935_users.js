exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("userId").primary();
    table.string("email").notNull();
    table.string("password").notNull();
    table.string("firstName").notNull();
    table.string("lastName").notNull();
    table.integer("phone").notNull();
    table.boolean("admin");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
