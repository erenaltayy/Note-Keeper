const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'note-app',
    password: 'samsung',
    port: 5432,
});

pool.connect();

module.exports = pool;


