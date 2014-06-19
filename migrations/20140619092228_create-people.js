'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('people');
};
