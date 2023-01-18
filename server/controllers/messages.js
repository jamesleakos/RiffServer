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

  getDirectMessages: async (req, res) => {
    // Verify the user's JWT token
    try {
      // Use the uid from the decoded token to retrieve the user's private data from other db
      const userId = await models.users.getUserIdFromFirebaseId(req.headers.firebase_id);

      models.messages.getDirectMessages(userId, req.params.recipient_id)
        .then((directMessages) => {
          res.status(200).send(directMessages)
        })
        .catch((err) => {
          res.status(501).send(err)
        })

    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  },

  // postMessage: (req, res) => {
  //   const { message, server_id, channel_id, user_id, recipient_id } = req.body.message;
  //   models.messages.postMessage(message, server_id, channel_id, user_id, recipient_id)
  //     .then(() => {
  //       res.status(201).send(req.body);
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     });
  // },

  _postMessage: (newMessage) => {
    const { message, server_id, channel_id, user_id, recipient_id } = newMessage;
    return models.messages.postMessage(message, server_id, channel_id, user_id, recipient_id)
      .then(() => {
        return newMessage;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

}