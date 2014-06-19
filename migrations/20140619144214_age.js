
exports.up = function(knex, Promise) {
  return knex.schema.table('people', function(table) {
    table.integer('age').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('people', function (table) {
    table.dropColumn('age');
  });
};
