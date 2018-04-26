import React, { Component } from 'react';
import io from "socket.io-client";
import { Switch, Route } from 'react-router-dom';
import Chat from '../Chat/Chat';
import Login from '../Login/Login';

class Layout extends Component {
    constructor () {
        super();
        this.state = {
            socket: null,
            username: null
        }
    }

    componentDidMount () {
        this.initSocket();
    }

    initSocket = () => {
        const socket = io();  // io defaults to the server
        console.log('Socket', socket);

        socket.on('connect', () => {
            console.log('Connected');
        });

        // The socket object is stored in state
        this.setState({ socket });
    }

    login = (e) => {
        e.preventDefault();
        const { socket, username } = this.state;
        socket.emit('login', username);
    }

    logout = () => {
        const { socket } = this.state;
        socket.emit('logout');
        this.setState({ user: null });
    }

    render () {
        return (
            <Switch>
                <Route exact path="/" render={() => <Login />} />
                <Route path="/chat" component={Chat} />
            </Switch>
        )
    }
}

export default Layout;