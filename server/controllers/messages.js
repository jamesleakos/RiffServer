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
    const { message, server_id, channel_id, user_id, recipient_id } = req.body.message;
    models.messages.postMessage(message, server_id, channel_id, user_id, recipient_id)
      .then(() => {
        res.status(201).send(req.body);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

}