const path = require('path');
const { Pool } = require('pg')

const pool = new Pool({
  database: 'riff'
});

module.exports = {
  query: (text, params) => { return pool.query(text, params) },
  connect: () => {return pool.connect()}
}