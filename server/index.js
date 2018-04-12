require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
    //   session = require('express-session'),
    //   massive = require('massive'),
      socket = require('socket.io');

// Controllers
// const authCtrl = require('./controllers/auth_controller');

// Middleware
// const checkSession = require('./middleware/checkForSession');

const app = express();

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


const port = process.env.SERVER_PORT || 3080;
const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

// temp data
const messages = [
    {message: 'This is message number 1'},
    {message: 'This is message number 2'},
    {message: 'This is message number 3'},
    {message: 'This is message number 4'},
    {message: 'This is message number 5'}
];

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    // User joins the chat room
    socket.join('CHAT ROOM');
    console.log('A user joined chat');

    // When the users join they get there previous messages
    socket.on('JOIN', () => {
      io.emit('GET_MESSAGES', messages);
    })

    // The message is sent and received
    socket.on('SEND_MESSAGE', (data) => {
      io.emit('RECEIVE_MESSAGE', data);
    })

    // Disconnects the user from the chat
    socket.on('DISCONNECT', () => {
        console.log('A user disconnected from chat');
    })
});