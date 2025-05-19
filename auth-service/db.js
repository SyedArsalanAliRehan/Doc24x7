// db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: '13.232.235.112',
  port: 5432,
  user: 'docuser',
  password: 'docpass',
  database: 'doc24x7',
});

module.exports = pool;
