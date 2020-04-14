// this file stores configurations about how to connect
// to the database using Knex

module.exports = {
  development: {
    // the client changes depending on the target DBMS
    client: "sqlite3", // the database driver
    connection: {
      // the location of the database file
      filename: "./data/car-dealer.db3", // for SQLite only
    },
    useNullAsDefault: true, // for SQLite only
    migrations: {
      // where to store the migration files
      directory: "./data/migrations",
    },
  },
};
