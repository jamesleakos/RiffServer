const router = require('express').Router();
const controllers = require('./controllers');

router.get('/users/:username', controllers.messages.getUserId);

router.get('/messages/:server_id/:channel_id', controllers.messages.getMessages);

router.get('/servers/:user_id', controllers.messages.getServers);

router.get('/channels/:server_id', controllers.messages.getChannels);

router.get('/friends/:user_id', controllers.messages.getFriends);

router.post('/users', controllers.messages.createUser);

router.post('/messages', controllers.messages.postMessage);

router.post('/servers', controllers.messages.createServer);

router.post('/channels', controllers.messages.createChannel);

router.post('friends', controllers.messages.addFriend);

router.post('/servers/:server_id/:user_id', controllers.messages.inviteUser);


module.exports = router;