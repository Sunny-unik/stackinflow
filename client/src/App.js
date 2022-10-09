import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import {
  FaHamburger,
  FaRegistered,
  FaSignInAlt,
  FaSignOutAlt,
  FaTerminal,
  FaUserTie
} from "react-icons/fa";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import SearchBox from "./components/searchBox";
import CanvasNav from "./components/canvasNav";

export default function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => dispatch({ type: "LOGOUT_USER" });

  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-primary bg-dark sticky-top">
        <div className="container-lg">
          <button
            class="btn btn-dark d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#smMenu"
          >
            <FaHamburger color="white" />
          </button>
          <NavLink
            className="navbar-brand"
            style={{ fontSize: "1.6rem", fontWeight: "700" }}
            activeclassname="activeTopNav"
            exact
            to="/"
          >
            <i>Stackinflow</i>
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#topNavbar"
          >
            <span class="navbar-toggler-icon">
              <FaTerminal color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="topNavbar">
            <SearchBox />
            <ul className="navbar-nav me-4 ms-4 text-center">
              {!user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink activeClassName="activeTopNav" to="/Login">
                    <FaSignInAlt />
                    LogIn
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink
                    activeClassName="activeTopNav"
                    to="/Signup"
                    style={{ fontFamily: "Monaco" }}
                  >
                    <FaRegistered />
                    SignIn
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink
                    activeClassName="activeTopNav"
                    to="/Profile"
                    style={{ fontFamily: "Monaco" }}
                  >
                    <FaUserTie />
                    Profile
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink
                    activeClassName="activeTopNav"
                    to="/Login"
                    onClick={logout}
                    style={{ fontFamily: "Monaco" }}
                  >
                    <FaSignOutAlt />
                    LogOut
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div class="offcanvas offcanvas-start w-75" id="smMenu">
        <div class="offcanvas-header p-2 mt-1">
          <button
            type="button"
            class="btn-close btn-close-dark"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div class="offcanvas-body p-0">
          <CanvasNav />
        </div>
      </div>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
