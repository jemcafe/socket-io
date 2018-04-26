require('dotenv').config();
const app = require('express')(),
      bodyParser = require('body-parser')
      server = require('http').Server(app), // http.Server listens to the server (app) for requests sent with an 'HTTP'.
      io = module.exports.io = require('socket.io')(server);  // socket.io listens to the server for sockets

// Controllers
const socketCtrl = require('./socket_controller/socket_controller');

// json parser
app.use(bodyParser.json());

// Socket.io
io.on('connection', socketCtrl);

// Server listening
const port = process.env.SERVER_PORT || 3080;
server.listen(port, () => console.log(`Listening on port: ${port}`));