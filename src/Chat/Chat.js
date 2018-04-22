import React, { Component } from 'react';
import axios from 'axios';
import io from "socket.io-client";
const socket = io(); // io defaults to the server

class Chat extends Component {
    constructor () {
        super();
        this.state = {
            messages: [],
            username: '',
            message: ''
        }

        socket.on('receive_message', (data) => {  // listens to incoming message
            this.setState(prevState => ({
                messages: [...prevState.messages, data]
            }));
        });
    }

    componentDidMount () {
        this.initSocket();
        // socket.emit('join');

        // socket.on('get_messages', (data) => { // gets past messages
        //     console.log(data);
        // });
        
        // axios.get('/user').then( user => {
        //     if (user.data.username) {
        //         console.log('User ->', user.data)
        //         this.setState({ user: user.data });
        //     } else this.props.history.push('/');
        // }).catch(err => console.log(err));
    }

    handleChange = (property, value) => {
        this.setState({ [property]: value });
    }

    initSocket = () => {
        socket.on('connect', () => {
            console.log('Connected');
            // socket.emit('join');
        });
        console.log(socket);
        this.getMessages();
    }

    getMessages = () => {
        socket.on('get_messages', messages => {
            console.log('messages', messages);
            this.setState({messages});
        });
    }

    sendMessage = (e) => {
        e.preventDefault();
        socket.emit('send_message', {  // sends the message to the server
            username: this.state.username,
            message: this.state.message
        });
        this.setState({ message: '' });
    }

    // logout = () => {
    //     axios.post('/logout').then( user => {
    //         socket.on('disconnect', )
    //         this.props.history.push('/');
    //     }).catch(err => console.log(err));
    // }

    render () {
        const { user, messages, message } = this.state;
        return (
            <div className="chat">
                <ul className="messages">
                    <div className="container">
                    { messages.map((m, i) => (
                        <li key={i} style={{wordBreak:'break-all'}}>{m.username}: {m.message}</li>)
                    ) }
                    </div>
                </ul>
                <div className="container">

                    {/* <button className="signout-btn btn" onClick={this.logout}>Sign out</button> */}

                    <form onSubmit={this.sendMessage}>
                        <input value={this.state.username} onChange={(e) => this.handleChange('username', e.target.value)}/>
                        <div style={{display:'flex'}}>
                            { user && <div className="avatar" style={{background:`center / cover no-repeat url(${user.avatar})`}}></div> }
                            <textarea className="input" value={message} placeholder="Message..." onChange={(e) => this.handleChange('message', e.target.value)}></textarea>
                        </div>
                        <div className="submit-btn">
                            <input className="btn" type="submit" value="Send"/>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default Chat;