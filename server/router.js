const router = require('express').Router();
const controllers = require('./controllers');

router.get('/users/:firebase_id', controllers.users.getUserId);

router.get('/messages/:server_id/:channel_id', controllers.messages.getMessages);

router.get('/directmessages/:user_id/:recipient_id', controllers.messages.getDirectMessages);

router.get('/servers/:user_id', controllers.servers.getServers);

router.get('/server/:server_id/users', controllers.servers.getUsersInServer);

router.get('/channels/:server_id', controllers.channels.getChannels);

router.get('/friends/:user_id', controllers.users.getFriends);

router.post('/users', controllers.users.createUser);

// router.post('/messages', controllers.messages.postMessage);

router.post('/servers', controllers.servers.createServer);

router.post('/servers/:server_id/:user_id', controllers.servers.inviteUser);

router.post('/channels', controllers.channels.createChannel);

router.post('/friends', controllers.users.addFriend);

router.put('/users/:user_id', controllers.users.updateOnline);

module.exports = router;