const router = require('express').Router();
const controllers = require('./controllers');

router.get('/test', controllers.test.get);

module.exports = router;