import "./index.css";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <ul className="footerNav">
        <NavLink to={"/about"} target="_blank">
          <h6>About</h6>
        </NavLink>
        <NavLink to={"/feedback"} target="_blank">
          <h6>Feedback</h6>
        </NavLink>
      </ul>
      <p className="fPara">
        Copyright © 2021 Stackinflow
        <span className="text-white mx-2">&middot;</span>
        All rights reserved.
      </p>
      <p className="fPara">
        Made by{" "}
        <a
          href="https://sunny.is-a.dev"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          Sunny Creations
        </a>{" "}
        @ 2021
      </p>
    </footer>
  );
}
