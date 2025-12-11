exports.up = function(knex) {
  return knex.schema.createTable('articles', function(table) {
    table.increments('article_id').primary();
    table.string('title', 500).notNullable();
    table.string('subtitle', 1000).nullable();
    table.text('content', 'longtext').notNullable();
    table.string('image', 500).nullable();
    table.integer('created_by').unsigned().notNullable();
    table.integer('updated_by').unsigned().nullable();
    table.timestamps(true, true); // created_at, updated_at with default CURRENT_TIMESTAMP

    // Foreign keys
    table.foreign('created_by').references('user_id').inTable('users').onDelete('RESTRICT');
    table.foreign('updated_by').references('user_id').inTable('users').onDelete('SET NULL');

    // Indexes
    table.index('created_by');
    table.index('created_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles');
};
