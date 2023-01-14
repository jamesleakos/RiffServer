const models = require('../models');

module.exports = {
  getUserId: (req, res) => {
    models.messages.getUserId (req.params.username)
      .then((userInfo) => {
        res.status(200).send(userInfo);
      })
      .catch((err) => {
        res.status(501).send();
      });
  },

  getMessages: (req, res) => {
    models.messages.getMessages(req.query.server_id, req.query.channel_id)
      .then((messages) => {
        res.status(200).send(messages);
      })
      .catch((err) => {
        res.status(501).send();
      });
  },

  getServers: (req, res) => {
    models.messages.getServers(req.query.user_id)
      .then((servers) => {
        res.status(200).send(servers);
      })
      .catch((err) => {
        res.status(501).send();
      });
  },

  getChannels: (req, res) => {
    models.messages.getChannels(req.query.server_id)
      .then((channels) => {
        res.status(200).send(channels);
      })
      .catch((err) => {
        res.status(501).send();
      })
  },

  getFriends: (req, res) => {
    models.messages.getFriends(req.query.user_id)
      .then((friends) => {
        res.status(200).send(friends);
      })
      .catch((err) => {
        res.status(501).send();
      })
  },

  createUser: (req, res) => {
    console.log(req.body)
    models.messages.createUser(req.body.username, req.body.password)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send();
      })
  },

  postMessage: (req, res) => {
    models.messages.postMessage(req.body.message, req.body.server_id, req.body.channel_id, req.body.user_id, req.body.recipient_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send();
      });
  },

  createServer: (req, res) => {
    models.messages.createServer(req.body.server_name, req.body.private, req.body.admin_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501);
      })
  },

  createChannel: (req, res) => {
    model.messages.createChannel(req.body.channel_name, req.body.server_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send();
      })
  },

  addFriend: (req, res) => {
    model.messages.addFriend(req.body.user_id, req.body.friend_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send();
      })
  },

  inviteUser: (req, res) => {
    model.messages.inviteUser(req.query.user_id, req.query.server_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send();
      })
  }

}