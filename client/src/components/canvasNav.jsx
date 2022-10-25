import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CanvasNav(props) {
  const user = useSelector((state) => state.user);

  const sidelink = () => {
    user
      ? props.history.push("/askaquestion")
      : alert("User need to login first");
  };

  return (
    <ul id="canvasNav" className="p-1">
      <li className="mt-2 p-1">
        <NavLink
          activeClassName="activeLeftNav"
          style={{
            fontFamily: "serif",
            fontSize: "1.4em",
            textShadow: "0.02em 0.02em black"
          }}
          exact
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <NavLink
          activeClassName="activeLeftNav"
          style={{
            fontFamily: "serif",
            fontSize: "1.4em",
            textShadow: "0.02em 0.02em black"
          }}
          to="/questions"
        >
          All Question
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <NavLink
          activeClassName="activeLeftNav"
          style={{
            fontFamily: "serif",
            fontSize: "1.4em",
            textShadow: "0.02em 0.02em black"
          }}
          to="/popularTags"
        >
          Popular Tags
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <NavLink
          activeClassName="activeLeftNav"
          style={{
            fontFamily: "serif",
            fontSize: "1.4em",
            textShadow: "0.02em 0.02em black"
          }}
          to="/popularUsers"
        >
          Popular Users
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <h6
          activeClassName="activeLeftNav"
          className="extraLink"
          style={{
            fontFamily: "serif",
            textShadow: "0.02em 0.02em black",
            fontSize: "1.4rem"
          }}
          onClick={sidelink}
        >
          Ask Question
        </h6>
      </li>
    </ul>
  );
}
