require('dotenv').config();
const app = require('express')(),
      bodyParser = require('body-parser'),
    //   session = require('express-session'),
    //   massive = require('massive'),
      server = require('http').Server(app), // http.Server listens to the server (app) for requests sent with an 'HTTP'.
      io = module.exports.io = require('socket.io')(server);  // socket.io listens to the server for sockets

// Controllers
// const authCtrl = require('./controllers/auth_controller');
const socketCtrl = require('./controllers/socket_controller');

// Middleware
// const checkSession = require('./middleware/checkForSession');

app.use(bodyParser.json());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(checkSession);
// massive(process.env.CONNECTION_STRING)
//     .then(db => app.set('db', db))
//     .catch(err => console.log(err));


// Endpoints
    // Auth
    // app.post('/login', authCtrl.login);
    // app.post('/register', authCtrl.register);
    // app.post('/logout', authCtrl.logout);
    // app.get('/user', authCtrl.getUser);

// Socket.io
io.on('connection', socketCtrl);

// Server listening
const port = process.env.SERVER_PORT || 3080;
server.listen(port, () => console.log(`Listening on port: ${port}`));