import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor () {
        super();
        this.state = { 
            username: '',
            password: ''
        }
    }

    componentDidMount () {
        axios.get('/user').then( user => {
            console.log('User ->', user.data);
            if (user.data.username) this.props.history.push('/chat');
        }).catch(err => console.log(err));
    }

    handleChange = (property, value) => {
        this.setState({ [property]: value });
    }

    signin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        axios.post('/login', { username, password })
        .then( user => {
            console.log('User ->', user.data);
            if (user.data) this.props.history.push('/chat');
        }).catch(err => console.log(err));
    }

    render () {
        return (
            <div className="signin">
                <div className="container">

                    <form onSubmit={this.signin}>
                        <input className="input" placeholder="Username" onChange={(e) => this.handleChange('username',e.target.value)}/>
                        <input className="input" placeholder="Password" type="password" onChange={(e) => this.handleChange('password',e.target.value)}/>
                        <div className="submit-btn">
                            <input className="btn" type="submit" value="Sign in"/>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default Signin;