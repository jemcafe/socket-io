import React, { Component } from 'react';
import axios from 'axios';

class Chat extends Component {
    constructor () {
        super();
        this.state = {
            messages: [{message: 'message 1'},{message: 'message 2'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'},{message: 'message 3'}],
            message: ''
        }

        this.sendMessage = () => {
            socket.emit('SEND_MESSAGE', {  // sends the message to the server
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        }

        socket.on('RECEIVE_MESSAGE', function(data) {  // listens to incoming message
            addMessage(data);
        });

        // socket.on('DISCONNECT', )
    
        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };
    }

    componentDidMount () {
        axios.get('/user').then( user => {
            if (user.data.username) {
                console.log('User ->', user.data)
                this.setState({ user: user.data });
            } else this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    signout = () => {
        axios.post('/logout').then( user => {
            // socket.on('DISCONNECT', )
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    handleChange = (property, value) => {
        this.setState({ [property]: value });
    }

    sendMessage = (e) => {
        e.preventDefault();
        // This is temporary
        this.setState(prevState => ({ 
            messages: [...prevState.messages, { message: prevState.message }],
            message: ''
        }));
        console.log('Message sent');
    }

    render () {
        const { user, messages, message } = this.state;
        return (
            <div className="chat">
                <ul className="messages">
                    { messages.map( (m, i) => {
                        return <li key={i}>{m.message}</li>
                    }) }
                </ul>
                <div className="container">

                    <button className="signout-btn btn" onClick={this.signout}>Sign out</button>

                    <form onSubmit={this.sendMessage}>
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