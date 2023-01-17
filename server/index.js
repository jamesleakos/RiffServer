const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const axios = require('axios');

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(cors());

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());

const socketIO = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:3000"
  }
});

socketIO.on('connection', (socket) => {
  console.log("connected", socket.id)
  socket.on('message', (message) => {
    axios.post(`http://localhost:3000/messages`, { message })
      .then(response => {
        socketIO.emit('new_message', response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

app.use('/', router);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});