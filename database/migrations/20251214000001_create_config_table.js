exports.up = function(knex) {
  return knex.schema.createTable('config', function(table) {
    table.increments('config_id').primary();
    table.string('web_name', 255).notNullable();
    table.string('web_icon', 500).nullable();
    table.string('web_logo', 500).nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('updated_by').unsigned().nullable();
    table.foreign('updated_by').references('user_id').inTable('users').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('config');
};
