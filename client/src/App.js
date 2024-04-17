import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { authenticateUser, logoutUser } from "./action/userAction";
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
import SearchBox from "./components/SearchQuestion/SearchBox";
import CanvasNav from "./components/Home/CanvasNav";
import OverlayLoading from "./components/loadings/OverlayLoading";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  const logout = () => dispatch(logoutUser);

  return (
    <BrowserRouter>
      {loading && <OverlayLoading />}
      <nav className="p-0 navbar navbar-expand-sm navbar-primary bg-dark sticky-top">
        <div className="container-lg">
          <button
            className="btn btn-dark d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#smMenu"
          >
            <FaHamburger color="white" />
          </button>
          <NavLink
            className="navbar-brand"
            style={{ fontSize: "1.6rem", fontWeight: "700" }}
            exact
            to="/"
          >
            <i>Stackinflow</i>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#topNavbar"
          >
            <span className="navbar-toggler-icon">
              <FaTerminal color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="topNavbar">
            <SearchBox />
            <ul className="navbar-nav me-4 ms-4 text-center">
              {!user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink
                    activeClassName="activeTopNav"
                    className="p-2"
                    to="/login"
                  >
                    <FaSignInAlt /> LogIn
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink
                    activeClassName="activeTopNav"
                    className="p-2"
                    to="/signup"
                  >
                    <FaRegistered /> SignIn
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-link me-1 ms-1">
                  <NavLink
                    activeClassName="activeTopNav"
                    to="/profile"
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
                    to="/login"
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
      <div className="offcanvas offcanvas-start w-50" id="smMenu">
        <div className="offcanvas-header p-2 mt-1">
          <button
            type="button"
            className="btn-close btn-close-dark"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <CanvasNav />
        </div>
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
