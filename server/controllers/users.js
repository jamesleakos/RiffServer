const models = require('../models');

module.exports = {
  getUserId: (req, res) => {
    models.users.getUserId (req.params.username)
      .then((userInfo) => {
        res.status(200).send(userInfo);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getFriends: (req, res) => {
    models.users.getFriends(req.params.user_id)
      .then((friends) => {
        res.status(200).send(friends);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  createUser: (req, res) => {
    console.log('create user');
    models.users.createUser(req.body.username, req.body.firebase_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  addFriend: (req, res) => {
    models.users.addFriend(req.body.user_id, req.body.friend_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  }
}