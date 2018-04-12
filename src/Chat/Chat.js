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

        // this.sendMessage = (e) => {
        //     e.preventDefault();
        //     socket.emit('SEND_MESSAGE', {  // sends the message to the server
        //         username: this.state.username,
        //         message: this.state.message
        //     });
        //     this.setState({ message: '' });
        // }

        socket.on('RECEIVE_MESSAGE', (data) => {  // listens to incoming message
            addMessage(data);
        });

        // socket.on('DISCONNECT', )
    
        const addMessage = data => {
            this.setState(prevState => ({messages: [...prevState.messages, data]}));
        };
    }

    componentDidMount () {
        socket.emit('JOIN');

        socket.on('GET_MESSAGES', (data) => { // gets past messages
            console.log(data);
        });
        
        // axios.get('/user').then( user => {
        //     if (user.data.username) {
        //         console.log('User ->', user.data)
        //         this.setState({ user: user.data });
        //     } else this.props.history.push('/');
        // }).catch(err => console.log(err));
    }

    // signout = () => {
    //     axios.post('/logout').then( user => {
            // socket.on('DISCONNECT', )
    //         this.props.history.push('/');
    //     }).catch(err => console.log(err));
    // }

    handleChange = (property, value) => {
        this.setState({ [property]: value });
    }

    sendMessage = (e) => {
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {  // sends the message to the server
            username: this.state.username,
            message: this.state.message
        });
        this.setState({ message: '' });
    }

    render () {
        const { user, messages, message } = this.state;
        return (
            <div className="chat">
                <ul className="messages">
                    { messages.map((m, i) => (<li key={i}>{m.username}: {m.message}</li>)) }
                </ul>
                <div className="container">

                    {/* <button className="signout-btn btn" onClick={this.signout}>Sign out</button> */}

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