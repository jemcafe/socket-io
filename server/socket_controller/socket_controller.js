const io = require('../index.js').io;  // io is exported form index.js to be used in this file
const uuidv4 = require('uuid/v4');  // creates unique ids

// Socket events
const {
    LOGIN,
    LOGOUT,
    CHAT_ROOM,
    JOIN_CHAT,
    GET_MESSAGES,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    PRIVATE_MESSAGE,
    USER_DISCONNECTED,
    TYPING
} = require('./events');

// Data
const connections = [];
const users = [];
const chatRooms = [];
const messages = [];

module.exports = (socket) => {
    connections.push(socket);
    console.log('Connected: ', connections.length);
    console.log('Socket ids', connections.map(e => e.id));

    // Login
    socket.on(LOGIN, (data) => {
        console.log('Login');
    });

    // Logout
    socket.on(LOGOUT, (data) => {
        console.log('Logout');
    });
    
    // User joins the chat room
    // socket.join(CHAT_ROOM, () => {
    //     console.log('A user joined chat room');
    // });

    // When the users join they get there previous messages
    socket.on(JOIN_CHAT, () => {
        console.log('got messages after join');
        io.emit(GET_MESSAGES, messages);
    });

    // The message is sent and received
    socket.on(SEND_MESSAGE, (data) => {
        console.log('send_message', data);
        io.emit(RECEIVE_MESSAGE, data);
    });

    // Disconnects the user from the chat
    socket.on(USER_DISCONNECTED, () => {
        console.log('A user disconnected from chat');
    });
}

// Create user
const createUser = (data) => ({
    id: uuidv4(),
    time: new Date(),
    message: data.message,
    username: data.username
});