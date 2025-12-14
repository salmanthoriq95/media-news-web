exports.up = function(knex) {
  return knex.schema.table('articles', function(table) {
    table.boolean('is_highlight').defaultTo(false).notNullable();
    table.index('is_highlight');
  });
};

exports.down = function(knex) {
  return knex.schema.table('articles', function(table) {
    table.dropColumn('is_highlight');
  });
};
