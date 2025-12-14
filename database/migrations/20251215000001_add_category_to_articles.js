exports.up = function(knex) {
  return knex.schema.table('articles', function(table) {
    table.string('category', 100).nullable().after('subtitle');
  });
};

exports.down = function(knex) {
  return knex.schema.table('articles', function(table) {
    table.dropColumn('category');
  });
};
