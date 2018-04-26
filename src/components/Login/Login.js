import React, { Component } from 'react';

class Login extends Component {
    constructor () {
        super();
        this.state = {
            username: ''
        }
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