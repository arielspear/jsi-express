// Update with your config settings.

module.exports = {

  development: {
    client: 'postgres',
    connection: process.env.DATABASE_URL || 'postgresql://localhost/peoplestore'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'postgresql'
    }
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL
  }
};