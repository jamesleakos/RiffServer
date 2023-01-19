const db = require('../database/db');

module.exports = {
  getChannels: (server_id) => {
    return db.query(`SELECT * FROM channels WHERE server_id=${server_id}`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      });
  },

  createChannel: (channel_name, server_id) => {
    const queryString = `INSERT INTO channels (channel_name, server_id) VALUES ($1, $2)`

    return db.query(queryString, [channel_name, server_id])
      .catch((err) => {
        return err;
      })
  },

  deleteChannel: (channel_name, server_id) => {
    const queryString = `DELETE FROM channels (channel_name, server_id) VALUES ($1, $2)`

    return db.query(queryString, [channel_name, server_id])
      .catch((err) => {
        return err;
      })
  },
}