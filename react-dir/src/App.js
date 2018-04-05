import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Orders from './Orders';
import Friends from './friends';
import Login from '../components/Login';
import Register from '../components/Register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <div>
              <Route path="/friends" Component={Friends} />
          </div>
          <div>
              <Route exact path="/Orders" Component={Orders} />
          </div>
          <div>
              <Route exact path="/Login" Component={Login} />
          </div>
          <div>
              <Route exact path="/Register" Component={Register} />
          </div>
      </Router>
      </div>
    );
  }
}

export default App;
