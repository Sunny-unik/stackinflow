import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import {useDispatch, useSelector} from 'react-redux';
import { FaRegistered, FaSearch, FaSignInAlt, FaSignOutAlt, FaUserTie } from 'react-icons/fa';

function App() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  function logout(){
    dispatch({type:"LOGOUT_USER"});
    alert("User successfully logout")
  }

  return (
<Router>
  <nav class="navbar navbar-expand-sm bg-dark sticky-top">
    <div class="container">
      <ul class="navbar-nav w-100 m-auto">
        <li class="navbar-header col-md-2 text-center">
          <NavLink className="nabar-brand" style={{textDecoration:'none',fontSize:'1.4rem',fontFamily:'fantasy'}} activeClassName="active" exact to="/"><i>Stackinflow</i></NavLink>
        </li>
        <li class="nav-item col-md-8 text-center">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search Question" name="search"/>
          <div class="input-group-btn">
            <button class="btn btn-default bg-primary" type="button"><FaSearch/></button>
          </div>
        </div>
        </li>
        {!user &&<li class="navshrink nav-item col-sm-1 text-center">
          <NavLink class="nav-link" activeClassName="active" to="/Login" style={{fontFamily:'fantasy'}}><FaSignInAlt/>LogIn</NavLink>
        </li>}
        {!user &&<li class="nav-item navshrink col-sm-1 text-center">
          <NavLink class="nav-link" activeClassName="active" to="/Signup" style={{fontFamily:'fantasy'}}><FaRegistered/>SignIn</NavLink>
        </li>}
        {user &&<li class="nav-item col-sm-1 navshrink text-center">
          <NavLink class="nav-link" activeClassName="active" to="/Profile" style={{fontFamily:'fantasy'}}><FaUserTie/>Profile</NavLink>
        </li>}
        {user &&<li class="nav-item col-sm-1 text-center navshrink">
          <NavLink class="nav-link" activeClassName="active" to="/Login" onClick={logout} style={{fontFamily:'fantasy'}}><FaSignOutAlt/>LogOut</NavLink>
        </li>}
      </ul>
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