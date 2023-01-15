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
      return db.query(`SELECT username FROM users WHERE id = (SELECT friend_id FROM friends WHERE user_id=${user_id})`)
        .then((result) => {
          return result.rows;
        })
        .catch((err) => {
          return err;
        })
    },

    createUser: (username, password) => {
      const queryString = `INSERT INTO users (username, password) VALUES ($1, $2)`

      return db.query(queryString, [username, password])
        .catch((err) => {
          return err;
        })
    },

    postMessage: (message, server_id, channel_id, user_id, recipient_id) => {
      const queryString = `INSERT INTO messages (message, server_id, channel_id, user_id, recipient_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`

      return db.query(queryString, [message, server_id, channel_id, user_id, recipient_id, Date.now()])
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

    createChannel: (channel_name, server_id) => {
      const queryString = `INSERT INTO channels (channel_name, server_id) VALUES ($1, $2)`

      return db.query(queryString, [channel_name, server_id])
        .catch((err) => {
          return err;
        })
    },

    addFriend: (user_id, friend_id) => {
      const queryString = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)`

      return db.query(queryString, [user_id, friend_id])
        .catch((err) => {
          return err;
        } )
    },

    inviteUser: (server_id, user_id) => {
      console.log(server_id)
      const queryString = `INSERT INTO servers_users (user_id, server_id) VALUES ($1, $2)`

      return db.query(queryString, [user_id, server_id])
        .catch((err) => {
          console.log(err);
          return err;
        })
    }
};