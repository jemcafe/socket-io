import React, { Component } from 'react';
import io from "socket.io-client";
const socket = io(); // io defaults to the server

class Login extends Component {
    constructor () {
        super();
        this.state = { 
            username: ''
        }
    }

    componentDidMount () {
        console.log('Socket', socket);
    }

    login = (e) => {
        e.preventDefault();
        const { username } = this.state;
        socket.emit('login', username);
    }

    render () {
        console.log('username', this.state.username);
        return (
            <div className="login">
                <form onSubmit={this.login}>
                    <input className="input" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })}/>
                    <div className="submit-btn">
                        <input className="btn" type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;