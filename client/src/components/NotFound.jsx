import React from "react";
import { NavLink } from "react-router-dom";
import { SiLoop } from "react-icons/si";

export default function NotFound() {
  return (
    <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span className="display-1 fw-bold">4</span>
                <SiLoop />
                <span className="display-1 fw-bold bsb-flip-h">4</span>
              </h2>
              <h3 className="h2 mb-2">Oops! You're lost.</h3>
              <p className="mb-5">
                The page you are looking for was not found.
              </p>
              <NavLink
                className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
                to="/"
              >
                Back to Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
