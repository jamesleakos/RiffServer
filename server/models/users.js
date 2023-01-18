const db = require('../database/db');

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

  getFriends: (user_id) => {
    return db.query(`SELECT id, username, online FROM users WHERE id IN (SELECT friend_id FROM friends WHERE user_id=${user_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  createUser: (username, firebase_id) => {
    const queryString = `INSERT INTO users (username, firebase_id) VALUES ($1, $2)`

    return db.query(queryString, [username, firebase_id])
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

  getUserIdFromFirebaseId: (firebaseId) => {
    return db.query(`SELECT id FROM users WHERE firebase_id='${firebaseId}'`)
      .then(result => {
        return result.rows[0].firebase_id;
      })
      .catch(err => {
        return err;
      })
  }

}