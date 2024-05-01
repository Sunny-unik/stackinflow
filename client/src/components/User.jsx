import axios from "axios";
import { useEffect, useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import QuestionBox from "./QuestionBox";
import Spinner from "./loadings/Spinner";
import Error from "./Error";
import getAnchorOptions from "../helper/getAnchorOptions";

export default function User(props) {
  const uDname = props.match.params.dname;
  const [user, setUser] = useState({ loading: true, error: null, data: null });
  const [questions, setQuestion] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let userId = "";
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/by-dname?dname=` + uDname)
      .then((res) => {
        setUser({ data: res.data.data, loading: false, error: null });
        userId = res.data.data._id;
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/question/per-user?userId=${userId}`
          )
          .then((res) =>
            setQuestion({ data: res.data.data, loading: false, error: null })
          )
          .catch((error) => setQuestion({ data: null, loading: false, error }));
      })
      .catch((error) => {
        setUser({ data: null, loading: false, error });
        !userId && setQuestion({ loading: false, error: error, data: null });
      });
  }, [uDname]);

  return (
    <div style={{ minHeight: "70vh" }}>
      {user.loading ? (
        <Spinner />
      ) : (
        <>
          {user.data ? (
            <div className="container">
              <div className="d-md-flex mt-4">
                <div className="col-md-5 col-sm-10 text-center col-lg-4">
                  <div
                    className="profilePic col-sm-8 mx-auto"
                    data-aos="flip-up"
                    data-aos-once="true"
                    data-aos-duration="600"
                  >
                    <img
                      className="col-sm-12"
                      height="225rem"
                      width="225rem"
                      src={
                        user.profile
                          ? `${process.env.REACT_APP_API_URL}/${user.profile}`
                          : "../assets/img/profile.jpg"
                      }
                      alt="user profile"
                    />
                  </div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-duration="600"
                  className="px-md-4 col-md-8 col-lg-7 col-sm-10"
                >
                  <div className="text-center">
                    <label htmlFor="name">User's Name</label>
                    <h2 id="name">{user.data?.name}</h2>
                    <label htmlFor="dname">Display Name</label>
                    <h3 id="dname">{user.data?.dname}</h3>
                    {user.data.title && (
                      <>
                        <label htmlFor="workTitle">Work Title</label>
                        <h3 id="workTitle">{user.data.title}</h3>
                      </>
                    )}
                    {user.data.address && (
                      <>
                        <label htmlFor="address">Address</label>
                        <h4 id="address">
                          <IoLocationSharp /> {user.data.address}
                        </h4>
                      </>
                    )}
                    <div className="fw-bold fs-4 mb-2 d-flex justify-content-center gap-3">
                      {user.data.weblink && (
                        <a {...getAnchorOptions(null, user.data.weblink)}>
                          <abbr title={user.data.weblink}>
                            <FcCollaboration />
                          </abbr>
                        </a>
                      )}
                      {user.data.gitlink && (
                        <a {...getAnchorOptions(null, user.data.gitlink)}>
                          <abbr title={user.data.gitlink}>
                            <FaGithub />
                          </abbr>
                        </a>
                      )}
                      {user.data.twitter && (
                        <a {...getAnchorOptions(null, user.data.twitter)}>
                          <abbr title={user.data.twitter}>
                            <FaTwitter />
                          </abbr>
                        </a>
                      )}
                    </div>
                    <hr className="mt-3" />
                    <h4>
                      Total Points :
                      <span className="px-2">
                        {user.data.userlikes ? user.data.userlikes : 0}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="w-100" style={{ textAlign: "justify" }}>
                {user.data.about && (
                  <>
                    <label htmlFor="about">About</label>
                    <h5 id="about">{user.data.about}</h5>
                  </>
                )}
              </div>
              <hr className="mb-0 mt-5" />
              <div className="my-3">
                {questions.loading ? (
                  <Spinner />
                ) : (
                  <>
                    {questions.error ? (
                      <Error statusCode={questions.error.statusCode} />
                    ) : (
                      <>
                        {questions.data?.length ? (
                          <>
                            <h1 className="my-4">
                              Following questions are posted by{" "}
                              {user.data.dname}.
                            </h1>
                            <div>
                              {questions.data.map((q) => (
                                <QuestionBox
                                  key={q._id}
                                  questionId={q._id}
                                  likesCount={q.qlikesCount}
                                  questionTitle={q.question}
                                  answersCount={q.answersCount}
                                  tags={q.tags}
                                  dataAos={"fade-up"}
                                  userObj={
                                    q.userId
                                      ? q.userId
                                      : (q.userId = { dname: "404" })
                                  }
                                  date={q.date}
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                          <h1 className="text-center text-secondary">
                            {user.data.dname} has not posted any question.
                          </h1>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <Error
              statusCode={!user.data ? 404 : user.error.statusCode}
              message={!user.data ? "No user data found" : null}
              heading={!user.data ? "Not found" : null}
            />
          )}
        </>
      )}
    </div>
  );
}
