const path = require('path');
require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
  database: 'riff',
  user: process.env.DBUSER,
  password: process.env.DBPASS,
});

module.exports = {
  query: (text, params) => { return pool.query(text, params) },
  connect: () => {return pool.connect()}
}