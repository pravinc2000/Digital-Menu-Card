const pg = require('pg');
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'menucard',
  password: 'pravin20',
  port: 5432,  
});
module.exports=pool;