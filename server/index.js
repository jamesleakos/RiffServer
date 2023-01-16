const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(cors());

const PORT = process.env.PORT ? process.env.PORT : 3000;
app.listen(PORT);

app.use(express.json());

app.use('/', router);

console.log(`Listening at http://localhost:${PORT}`);