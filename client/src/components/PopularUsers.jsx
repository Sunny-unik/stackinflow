import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcCollaboration, FcSearch } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Spinner from "./loadings/Spinner";
import { NavLink } from "react-router-dom";
import Error from "./Error";

export default function PopularUsers(props) {
  const [usersLength, setUsersLength] = useState("{count loading...}"),
    [searchUser, setSearchUser] = useState(""),
    [users, setUsers] = useState({
      data: null,
      loading: true,
      error: null
    });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/count`)
      .then((res) => setUsersLength(res.data.data))
      .catch(() => setUsersLength("count failed"));
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/most-liked?limit=5000`)
      .then(({ data }) =>
        setUsers({ data: data.data, loading: false, error: null })
      )
      .catch((error = {}) => setUsers({ error, loading: false, data: null }));
  }, []);

  function goToUser() {
    if (searchUser === null) alert("Enter some tags first in input box");
    else if (searchUser.includes(" "))
      alert("Remove blank space from input box");
    else props.history.push("/user/" + searchUser);
  }

  return (
    <>
      <div
        data-count={usersLength}
        className="container pb-3 border border-2 border-top-0 border-start-0 border-end-0"
      >
        <div className="row flex-nowrap justify-content-between">
          <h1 className="py-1 d-inline-block w-50">Popular Users</h1>
          <form
            className="input-group flex-nowrap w-25 align-items-center"
            onSubmit={goToUser}
          >
            <input
              type="text"
              placeholder="Search User"
              name="searchP"
              id="searchP"
              className="form-control border-secondary px-2"
              onChange={(e) => setSearchUser(e.target.value)}
              value={searchUser}
            />
            <button className="btn btn-outline-secondary">
              <FcSearch />
            </button>
          </form>
        </div>
        <h4 className="fw-normal pb-2">
          These all users profiles are arranged in sequence as higher points to
          lowest.
        </h4>
      </div>
      <div style={{ minHeight: "60vh" }} className="p-3 text-center">
        {users.loading ? (
          <Spinner />
        ) : (
          <>
            {users.data.length ? (
              <div className="row gap-md-5 gap-4 justify-content-center">
                {users.data.map((p) => (
                  <div
                    className="card px-0 col-10 col-md-3 col-lg-2"
                    data-aos="flip-up"
                    data-aos-once="true"
                    data-aos-duration="500"
                    key={p._id}
                  >
                    <div className="px-0 text-center border-secondary">
                      <div className="card-img mt-3 mb-2">
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
                      <div className="card-body py-0">
                        <NavLink to={`/user/${p._id}`}>{p.dname}</NavLink>
                      </div>
                      <div className="my-2">
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
                      </div>
                      <div className="card-footer">
                        Points: {p.userlikes == null ? 0 : p.userlikes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Error />
            )}
          </>
        )}
      </div>
    </>
  );
}
AOS.init();
