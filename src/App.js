import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Aboutus from './components/Aboutus';
import Signup from './components/Signup'

function App() {
  return (

    <Router>
      <nav class="navbar navbar-inverse ">
        <div class="container ">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <span ><NavLink activeClassName="act" exact to="/"><h2>Stack<b>inflow</b></h2></NavLink></span>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav navbar-right">
              <li><NavLink activeClassName="act" to="/About"><span class="glyphicon glyphicon-info-sign"></span> About Us</NavLink></li>
              <li><NavLink activeClassName="act" to="/Login"><span class="glyphicon glyphicon-log-in"></span> Log In</NavLink></li>
              <li><NavLink activeClassName="act" to="/Signup"><span class="glyphicon glyphicon-registration-mark"></span> Sign Up</NavLink></li>
              <li><NavLink activeClassName="act" to="/Profile"><span class="glyphicon glyphicon-user"></span> Profile</NavLink></li>
              <li><NavLink activeClassName="act" to="/Login"><span class="glyphicon glyphicon-log-out"></span> Log Out</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/About" component={Aboutus} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Login" component={Login} />
      </Switch>
    </Router>

  );
}

export default App;
