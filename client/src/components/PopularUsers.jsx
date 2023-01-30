import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcCollaboration, FcSearch } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";

export default function Popularusers(props) {
  const [users, setusers] = useState("");
  const [searchuser, setsearchuser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/mostliked`)
      .then((res) => setusers(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function goToUser() {
    if (searchuser === null) alert("Enter some tags first in input box");
    else if (searchuser.includes(" "))
      alert("Remove blank space from input box");
    else props.history.push("/user/" + searchuser);
  }

  return (
    <>
      <div
        className="container pb-3"
        style={{ borderBottom: ".1rem solid lightgrey" }}
      >
        <h1 style={{ fontFamily: "sans-serif", marginTop: ".4rem" }}>
          Popular Users
        </h1>
        <h4 style={{ fontFamily: "Times", width: "95%" }}>
          These all users are arranged in sequence as higher points to lowest.
        </h4>
        <div class="row g-3">
          <div class="col-auto">
            <input
              type="text"
              list="usearch"
              placeholder="Search User"
              name="searchp"
              id="searchp"
              required
              className="form-control border-dark px-2 d-inline-block"
              style={{ fontFamily: "monospace" }}
              onChange={(e) => setsearchuser(e.target.value)}
              value={searchuser}
            />
            <datalist id="usearch">
              {users &&
                users.map((u) => <option value={u._id}>{u.dname}</option>)}
            </datalist>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-light border-dark"
              style={{ fontFamily: "Fantasy" }}
              onClick={goToUser}
            >
              <FcSearch /> Search
            </button>
          </div>
        </div>
      </div>
      <div style={{ minHeight: "60vh" }} className="p-3 text-center">
        {!users ? (
          <Spinner />
        ) : (
          users.map((p) => (
            <div
              className="bg-dark d-inline-block card m-md-4 m-3 w-25"
              data-aos="flip-up"
              data-aos-once="true"
              data-aos-duration="500"
              key={p._id}
            >
              <div className="border border-1 text-center border-secondary">
                <div className="card-img m-auto my-2 d-inline-block">
                  <img
                    height="50rem"
                    width="60rem"
                    src={
                      p.profile
                        ? `${process.env.REACT_APP_API_URL}/${p.profile}`
                        : "assets/img/profile.jpg"
                    }
                    alt="user profile"
                  />
                </div>
                <div className="card-body d-inline-block p-2">
                  <NavLink to={`/user/${p._id}`}>{p.dname}</NavLink>
                </div>
                <h6>
                  {p.weblink && (
                    <a target="_blank" href={p.weblink} rel="noreferrer">
                      <abbr title={p.weblink}>
                        <FcCollaboration />
                      </abbr>
                    </a>
                  )}
                  &nbsp;&middot;&nbsp;
                  {p.gitlink && (
                    <a target="_blank" href={p.gitlink} rel="noreferrer">
                      <abbr title={p.gitlink}>
                        <FaGithub />
                      </abbr>
                    </a>
                  )}
                  &nbsp;&middot;&nbsp;
                  {p.twitter && (
                    <a target="_blank" href={p.twitter} rel="noreferrer">
                      <abbr title={p.twitter}>
                        <FaTwitter />
                      </abbr>
                    </a>
                  )}
                  &nbsp;
                </h6>
                <div className="card-footer text-white">
                  Points: {p.userlikes == null ? 0 : p.userlikes}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
AOS.init();
