const { Pool } = require('pg');
// Create a new Pool instance
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'digimenu',
    password: 'Suresh@2023',
    port: 5432,
});
module.exports = pool;
