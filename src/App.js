import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Dashboard from './dashboard'
import login from './login'
import logout from './logout'
export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={login} />
          <Route path="/dashboard" exact component= {Dashboard} />
          <Route path="/logout" exact component={logout} />
        </Switch>
      </Router>
    );
  }
}
