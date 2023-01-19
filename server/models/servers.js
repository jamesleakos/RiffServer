const db = require('../database/db');

module.exports = {
  getServers: (user_id) => {
    return db.query(`SELECT * FROM servers WHERE id IN (SELECT server_id FROM servers_users WHERE user_id = ${user_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  getUsersInServer: (server_id) => {
    return db.query(`SELECT * FROM users WHERE id IN (SELECT user_id FROM servers_users WHERE server_id=${server_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  createServer: (server_name, private, admin_id) => {
    const createServerQuery = `INSERT INTO servers (server_name, private, admin_id) VALUES ($1, $2, $3) RETURNING id`

    const createDefaultChannelQuery = `INSERT INTO channels (channel_name, server_id) VALUES ($1, $2)`

    const addUserToServerQuery = `INSERT INTO servers_users (user_id, server_id) VALUES ($1, $2)`

    let server_id;

    return db.query(createServerQuery, [server_name, private, admin_id])
      .then((result) => {
        server_id = result.rows[0].id
        return Promise.all(db.query(createDefaultChannelQuery, ['general', server_id]), db.query(addUserToServerQuery, [admin_id, server_id]))
      })
      .catch((err) => {
        return err;
      })
  },

  deleteServer: (server_name, private, admin_id) => {
    const deleteServerQuery = `DELETE FROM servers (server_name, private, admin_id) VALUES ($1, $2, $3) RETURNING id`

    const deleteDefaultChannelQuery = `DELETE FROM channels (channel_name, server_id) VALUES ($1, $2)`

    const removeUserFromServerQuery = `DELETE FROM servers_users (user_id, server_id) VALUES ($1, $2)`

    let server_id;

    return db.query(deleteServerQuery, [server_name, private, admin_id])
      .then((result) => {
        server_id = result.rows[0].id
        return Promise.all(db.query(deleteDefaultChannelQuery, ['general', server_id]), db.query(removeUserFromServerQuery, [admin_id, server_id]))
      })
      .catch((err) => {
        return err;
      })
  },

  inviteUser: (server_id, user_id) => {
    const queryString = `INSERT INTO servers_users (user_id, server_id) VALUES ($1, $2)`

    return db.query(queryString, [user_id, server_id])
      .catch((err) => {
        return err;
      })
  }
}