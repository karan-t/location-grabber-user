import React, { Component } from "react";
import "./css/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Dashboard from './Components/dashboard'
import Protected from './Components/Protected'
import login from './Components/login'
import logout from './Components/logout'
export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={login} />
          <Protected path="/" exact component= {Dashboard} />
          <Route path="/logout" exact component={logout} />
        </Switch>
      </Router>
    );
  }
}
