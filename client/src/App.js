import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegistered, FaSearch, FaSignInAlt, FaSignOutAlt, FaUserTie } from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [questions, setquestions] = useState();
  const [questionsearch, setquestionsearch] = useState('');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function logout() {
    dispatch({ type: 'LOGOUT_USER' });
  }

  function inputhandler(params) {
    params.target.name === 'questionsearch' && setquestionsearch(params.target.value);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then(res => {
      console.log(res.data.data);
      setquestions(res.data.data);
    });
  }, []);

  return (
    <Router className='w-100'>
      <nav
        className='navbar navbar-expand-sm bg-dark sticky-top'
        style={{ width: '100% !important' }}
      >
        <div className='container'>
          <ul className='navbar-nav w-100 '>
            <li className='navbar-header col-md-2 text-center'>
              <NavLink
                className='nabar-brand'
                style={{ textDecoration: 'none', fontSize: '1.4rem', fontFamily: 'Fantasy' }}
                activeClassName='active'
                exact
                to='/'
              >
                <i>Stackinflow</i>
              </NavLink>
            </li>
            <li className='nav-item col-md-8 text-center'>
              <div className='input-group' onClick={inputhandler}>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search Question'
                  name='questionsearch'
                  value={questionsearch}
                  onChange={e => inputhandler(e)}
                  id='questionsearch'
                  list='qsearch'
                />
                <datalist id='qsearch' style={{ maxHeight: '50vh !important' }}>
                  {questions &&
                    questions.map(i => {
                      return <option>{i.question}</option>;
                    })}
                </datalist>
                <div className='input-group-btn' id='hidebtn'>
                  <NavLink
                    to={{
                      pathname: `/search/${questionsearch}`,
                      searchedquestion: questionsearch.replace(' ', ','),
                    }}
                  >
                    <button className='btn btn-default bg-primary' type='button'>
                      <FaSearch />
                    </button>
                  </NavLink>
                </div>
              </div>
            </li>
            {!user && (
              <li className='navshrink nav-item col-sm-1 text-center'>
                <NavLink
                  className='nav-link'
                  activeClassName='active'
                  to='/Login'
                  style={{ fontFamily: 'fantasy' }}
                >
                  <FaSignInAlt />
                  LogIn
                </NavLink>
              </li>
            )}
            {!user && (
              <li className='nav-item navshrink col-sm-1 text-center'>
                <NavLink
                  className='nav-link'
                  activeClassName='active'
                  to='/Signup'
                  style={{ fontFamily: 'fantasy' }}
                >
                  <FaRegistered />
                  SignIn
                </NavLink>
              </li>
            )}
            {user && (
              <li className='nav-item col-sm-1 navshrink text-center'>
                <NavLink
                  className='nav-link'
                  activeClassName='active'
                  to='/Profile'
                  style={{ fontFamily: 'fantasy' }}
                >
                  <FaUserTie />
                  Profile
                </NavLink>
              </li>
            )}
            {user && (
              <li className='nav-item col-sm-1 text-center navshrink'>
                <NavLink
                  className='nav-link'
                  activeClassName='active'
                  to='/Login'
                  onClick={logout}
                  style={{ fontFamily: 'fantasy' }}
                >
                  <FaSignOutAlt />
                  LogOut
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path='/Login' component={Login} />
        <Route path='/Signup' component={Signup} />
        <Route path='/Profile' component={Profile} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}
export default App;
