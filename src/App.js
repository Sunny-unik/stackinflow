import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import {useDispatch, useSelector} from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { FcSearch } from 'react-icons/fc';

function App(props) {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  function logout(){
    dispatch({type:"LOGOUT_USER"});
    alert("user successfully logout")
    // props.history.push("/Login");
  }

  return (
    <Router>
      <nav class="navbar navbar-inverse mainnavbar">
        <div class="container ">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <span ><NavLink activeClassName="active" exact to="/"><h2 className='cnavbrand' style={{fontFamily:'sans-serif'}}>Stack<b>inflow</b></h2></NavLink></span>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-sm-8">
              <input type="text" placeholder="Search Question" name="searchq" id="searchq" required className="bg-seconday searchq" style={{paddingLeft:'2%',fontSize:'medium',fontFamily:'serif'}} />
              <button class=" bg-warning searchb" type="button" style={{fontFamily:'fantasy'}}><FcSearch/> Search </button>
          </div>
          <div className="col-sm-4 collapse navbar-collapse" id="myNavbar" >
            <ul class="nav navbar-nav navbar-right">
              {!user &&<li className="mainnavitem"><NavLink activeClassName="active" to="/Login" style={{color:'dodgerblue',fontFamily:'fantasy',marginTop:'14%'}}><span class="glyphicon glyphicon-log-in"></span> Log In </NavLink></li>}
              {!user &&<li className="mainnavitem"><NavLink activeClassName="active" to="/Signup" style={{color:'dodgerblue',fontFamily:'fantasy',marginTop:'14%'}}><span class="glyphicon glyphicon-registration-mark"></span> Sign Up </NavLink></li>}
              {user && <li className="mainnavitem"><NavLink activeClassName="active" to="/Profile" style={{color:'dodgerblue',fontFamily:'fantasy',marginTop:'14%'}}><span class="glyphicon glyphicon-user"></span> Profile </NavLink></li>}
              {user && <li className="mainnavitem"><NavLink activeClassName="active" to="/Login" onClick={logout} style={{color:'dodgerblue',fontFamily:'fantasy',marginTop:'14%'}}><span class="glyphicon glyphicon-log-out"></span> Log Out </NavLink></li>}
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
