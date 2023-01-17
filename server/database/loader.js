const path = require('path');
const fs = require('fs');
const db = require('./db.js');
const copyFrom = require('pg-copy-streams').from;

const copyFromCSV = (tablename, csvName, nullValues) => {
  return new Promise((resolve, reject) => {
    db.connect()
    .then((client) => {
      const stream = client.query(copyFrom(`COPY ${tablename} FROM STDIN CSV HEADER NULL as '${nullValues}'`))
      const fileStream = fs.createReadStream(path.join(__dirname, `../../data/${csvName}.csv`))
      fileStream.on('error', (error) => {
        console.log(error);
        client.release();
      })
      stream.on('error', (error) => {
        console.log(error);
        client.release();
      })
      stream.on('finish', () => {
        console.log(`done copying ${tablename}` );
        client.release();
      })
      fileStream.pipe(stream)
        .on('finish', resolve)
        .on('error', reject)
    })
  })
};
