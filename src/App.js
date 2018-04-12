import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from './Chat/Chat';
import Signin from './Signin/Signin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Signin} /> */}
          <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    )
  }
}

export default App;
