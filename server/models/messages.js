const db = require('../database/db')

module.exports = {
  getUserId: (username) => {
    return db.query(`SELECT id FROM users WHERE username='${username}'`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      });
  },

  getMessages: (server_id, channel_id) => {
    return db.query(`SELECT * FROM messages WHERE server_id=${server_id} AND channel_id=${channel_id}`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      });
    },

    getServers: (user_id) => {
      return db.query(`SELECT * FROM servers WHERE server_id = (SELECT server_id FROM servers_users WHERE user_id = ${user_id})`)
    },

    getChannels: (server_id) => {
      return db.query(`SELECT * FROM channels WHERE server_id=${server_id}`)
        .then((result) => {
          return result.rows;
        })
        .catch((err) => {
          return err;
        });
    },

    getFriends: (user_id) => {
      return db.query(`SELECT * FROM friends WHERE user_id=${user_id}`)
        .then((result) => {
          return result.rows;
        })
        .catch((err) => {
          return err;
        })
    },

    createUser: (username, password) => {
      const queryString = `INSERT INTO users (username, password) VALUES ($1, $2)`

      return db.query(queryString, [username, password]);
    },

    postMessage: (message, server_id, channel_id, user_id, recipient_id) => {
      const queryString = `INSERT INTO messages (message, server_id, channel_id, user_id, recipient_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`

      return db.query(queryString, [message, server_id, channel_id, user_id, recipient_id, Date.now()])
    },

    createServer: (server_name, private, admin_id) => {
      const createServerQuery = `INSERT INTO servers (server_name, private, admin_id) VALUES ($1, $2, $3)`

      const addUserToServerQuery = `INSERT INTO servers_users (user_id, server_id) VALUES ($1, $2)`

      return db.query(queryString, [server_name, private, admin_id])
        .then(() => {
          return db.query(`SELECT id FROM servers WHERE server_name=${server_name} AND admin_id=${admin_id}`)
        })
        .then((result) => {
          const server_id = result.rows[0]
          return db.query(addUserToServerQuery, [admin_id, server_id])
        })
        .catch((err) => {
          return err;
        })
    },

    createChannel: (channel_name, server_id) => {
      const queryString = `INSERT INTO channels (channel_name, server_id) VALUES ($1, $2)`

      return db.query(queryString, [channel_id, server_id]);
    },

    addFriend: (user_id, friend_id) => {
      const queryString = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)`

      return db.query(queryString, [user_id, friend_id]);
    },

    inviteUser: (user_id, server_id) => {
      const queryString = `INSERT INTO servers_users (user_id, server_id) VALUE ($1, $2)`

      return db.query(queryString, [user_id, server_id]);
    }
};