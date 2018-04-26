import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    )
  }
}

export default App;
