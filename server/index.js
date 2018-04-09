require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      socket = require('socket.io');

const app = express();

app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .catch(err => console.log(err));

const port = process.env.SERVER_PORT || 3080;
app.listen(port, () => console.log(`Listening on port: ${port}`));

