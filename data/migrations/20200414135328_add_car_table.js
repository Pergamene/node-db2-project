
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.string('vin', 17).notNullable().unique().index();
    tbl.string('make').notNullable().index();
    tbl.string('model').notNullable().index();
    tbl.integer('miles').notNullable().index();

    tbl.string('transmission').index();
    tbl.string('title').index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
