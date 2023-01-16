const models = require('../models');

module.exports = {
  getMessages: (req, res) => {
    models.messages.getMessages(req.params.server_id, req.params.channel_id)
      .then((messages) => {
        res.status(200).send(messages);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getDirectMessages: (req, res) => {
    models.messages.getDirectMessages(req.params.user_id, req.params.recipient_id)
      .then((directMessages) => {
        res.status(200).send(directMessages)
      })
      .catch((err) => {
        res.status(501).send(err)
      })
  },

  postMessage: (req, res) => {
    models.messages.postMessage(req.body.message, req.body.server_id, req.body.channel_id, req.body.user_id, req.body.recipient_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

}