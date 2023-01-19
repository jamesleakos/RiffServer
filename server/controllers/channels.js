const models = require('../models');

module.exports = {
  getChannels: (req, res) => {
    models.channels.getChannels(req.params.server_id)
      .then((channels) => {
        res.status(200).send(channels);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  createChannel: (req, res) => {
    models.channels.createChannel(req.body.channel_name, req.body.server_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  deleteChannel: (req, res) => {
    models.channels.deleteChannel(req.body.channel_name, req.body.server_id)
      .then(() => {
        res.status(202).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },
}