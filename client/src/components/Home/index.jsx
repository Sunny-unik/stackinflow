import { useSelector } from "react-redux";
import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Footer from "../Footer";
import { FaHome, FaTags, FaUsers } from "react-icons/fa";
import { RiQuestionnaireFill } from "react-icons/ri";
import { TbPencilQuestion } from "react-icons/tb";
import routes from "./routes";
import { useLocation } from "react-router-dom";
import NotFound from "../NotFound";

export default function Home(props) {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const notFound = !routes.some(
    (r) => r.path.split("/")[1] === location.pathname.split("/")[1]
  );

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <div className="container-xl">
          <div className="row justify-content-center">
            <ul id="sideLeftNav" className="col-xl-1 col-sm-2 p-0">
              <li className="nav-link px-xl-0 px-3">
                <NavLink exact to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li className="nav-link px-xl-0 px-3">
                <NavLink to="/questions">
                  <RiQuestionnaireFill /> Questions
                </NavLink>
              </li>
              <li className="nav-link px-xl-0 px-3">
                <NavLink to="/tags">
                  <FaTags /> Tags
                </NavLink>
              </li>
              <li className="nav-link px-xl-0 px-3">
                <NavLink to="/users">
                  <FaUsers /> Users
                </NavLink>
              </li>
              <li className="nav-link px-xl-0 px-3">
                <div
                  className="extraLink"
                  onClick={() =>
                    user
                      ? props.history.push("/question/create")
                      : alert("You need to login first")
                  }
                >
                  <TbPencilQuestion /> Ask Question
                </div>
              </li>
            </ul>
            <div
              className="col-xl-10 col-sm-10 p-0 overflow-hidden border border-2"
              id="mainSection"
            >
              <Switch>
                {routes.map((routeObj) => (
                  <Route {...routeObj} key={routeObj.path} />
                ))}
              </Switch>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
