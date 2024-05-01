import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcCollaboration } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Spinner from "./loadings/Spinner";
import { NavLink } from "react-router-dom";
import UseSearchParam from "../helper/UseSearchParam";
import Error from "./Error";
import Pagination from "./Pagination";
import getAnchorOptions from "../helper/getAnchorOptions";
import { debounce } from "lodash";

export default function PopularUsers(props) {
  const location = UseSearchParam(),
    limit = location.get("limit") || 15,
    pageNumber = +location.get("page") || 0,
    [currentPage, setCurrentPage] = useState(
      pageNumber < 1 ? 0 : pageNumber - 1
    ),
    [perPageLimit, setPerPageLimit] = useState(limit < 0 ? 10 : limit),
    [usersLength, setUsersLength] = useState("{count loading...}"),
    searchUser = useRef(null),
    [users, setUsers] = useState({
      data: null,
      loading: true,
      error: null
    });

  const fetchUsersData = useCallback(
    async (value) => {
      const searchValue = searchUser.current?.value;
      setUsers({ loading: true, error: null, data: null });
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/count?search=${
            value || searchValue
          }`
        );
        setUsersLength(res.data.data);
      } catch (error) {
        setUsersLength("count failed");
      }
      axios
        .get(
          `${
            process.env.REACT_APP_API_URL
          }/user/most-liked?page=${currentPage}&limit=${perPageLimit}${
            value || searchValue ? `&search=${value || searchValue}` : ""
          }`
        )
        .then(({ data }) =>
          setUsers({ data: data.data, loading: false, error: null })
        )
        .catch((error = {}) => setUsers({ error, loading: false, data: null }));
    },
    [currentPage, perPageLimit]
  );

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback(
    debounce(({ target }) => {
      fetchUsersData(target.value);
    }, 400),
    [fetchUsersData]
  );

  return (
    <>
      <div className="container pb-3 border border-2 border-top-0 border-start-0 border-end-0">
        <div className="row flex-md-nowrap justify-content-between mb-2">
          <h1 className="py-1 d-inline-block col-md-6">
            {searchUser.current?.value ? "Matched" : "Total"} {usersLength}{" "}
            Users
          </h1>
          <div className="input-group flex-nowrap w-auto align-items-center">
            <input
              type="text"
              placeholder="Search User"
              name="searchP"
              id="searchP"
              className="form-control border-secondary px-2"
              onChange={handleInputChange}
              ref={searchUser}
            />
          </div>
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
            {users.data?.length ? (
              <>
                <div className="row gap-md-5 gap-4 justify-content-center">
                  {users.data.map((p) => (
                    <div
                      className="card px-0 col-10 col-md-3 col-lg-2"
                      data-aos="flip-up"
                      data-aos-once="true"
                      data-aos-duration="500"
                      key={p._id}
                    >
                      <div className="card-img mt-3 mb-2">
                        <img
                          className="rounded"
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
                        <div className="">{p.name}</div>
                        <NavLink to={`/user/${p.dname}`}>{p.dname}</NavLink>
                      </div>
                      <div className="my-2">
                        {p.weblink && (
                          <a {...getAnchorOptions(null, p.weblink)}>
                            <abbr title={p.weblink}>
                              <FcCollaboration />
                            </abbr>
                          </a>
                        )}
                        &nbsp;&middot;&nbsp;
                        {p.gitlink && (
                          <a {...getAnchorOptions(null, p.gitlink)}>
                            <abbr title={p.gitlink}>
                              <FaGithub />
                            </abbr>
                          </a>
                        )}
                        &nbsp;&middot;&nbsp;
                        {p.twitter && (
                          <a {...getAnchorOptions(null, p.twitter)}>
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
                  ))}
                </div>
                <Pagination
                  {...{
                    limitValues: [15, 30, 45],
                    limitsMessage: "users per page",
                    itemsLength: +usersLength || 0,
                    perPageLimit,
                    setPerPageLimit,
                    currentPage,
                    setCurrentPage,
                    history: props.history,
                    route: "/users"
                  }}
                />
              </>
            ) : (
              <Error
                statusCode={
                  users.data?.length === 0 ? 404 : users.error.statusCode
                }
                message={users.data?.length === 0 ? "No such data found" : null}
                heading={users.data?.length === 0 ? "Not found" : null}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
AOS.init();
