exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('user_id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('photo', 500).nullable();
    table.boolean('is_first_login').defaultTo(true);
    table.timestamps(true, true); // created_at, updated_at with default CURRENT_TIMESTAMP
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
