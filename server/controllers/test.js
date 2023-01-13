const models = require('../models');

exports.get = (req, res) => {
  models.test.get()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log('ERROR IN TEST: ', err.message);
      res.status(501);
    })
};