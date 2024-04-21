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
  const [user, setUser] = useState([]);
  // const [question, setQuestion] = useState({
  //   data: null,
  //   loading: true,
  //   error: null
  // });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/by-dname?dname=` + uDname)
      .then((res) => {
        console.log(res.data);
        setUser({ data: res.data.data, loading: false, error: null });
      })
      .catch((error) => {
        console.log(error);
        setUser({ data: null, loading: false, error });
      });

    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/question/list`)
    //   .then((res) =>
    //     setQuestion({ data: res.data.data, loading: false, error: null })
    //   )
    //   .catch((error) => {
    //     console.log({ error });
    //     setQuestion({ data: null, loading: false, error });
    //   });
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
                    <h4 className="d-flex gap-3 justify-content-center">
                      {user.data.weblink && (
                        <a {...getAnchorOptions(null, user.data.weblink)}>
                          <abbr title={user.data.weblink}>
                            <FcCollaboration />
                          </abbr>
                        </a>
                      )}
                      &middot;
                      {user.data.gitlink && (
                        <a {...getAnchorOptions(null, user.data.gitlink)}>
                          <abbr title={user.data.gitlink}>
                            <FaGithub />
                          </abbr>
                        </a>
                      )}
                      &middot;
                      {user.data.twitter && (
                        <a {...getAnchorOptions(null, user.data.twitter)}>
                          <abbr title={user.data.twitter}>
                            <FaTwitter />
                          </abbr>
                        </a>
                      )}
                    </h4>
                    <h4>
                      Total Points :
                      <span className="px-2">
                        {user.data.userlikes ? user.data.userlikes : 0}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-10">
                {user.data.about && (
                  <>
                    <label htmlFor="about">About</label>
                    <h3 id="about">{user.data.about}</h3>
                  </>
                )}
              </div>
              {/* <hr className="mb-0 mt-5" /> */}
              {/* <div>
            {askedquestion.length > 0 ? (
              <div>
                <h1>
                  <label>These Questions Asked by {dnamebyudn}.</label>
                </h1>
              </div>
            ) : (
              <h1 className="text-center text-secondary">
                {dnamebyudn} not post any question.
              </h1>
            )}
            <div>
              {askedquestion &&
                askedquestion.map((q) => {
                  return (
                    <div key={q._id}>
                      <QuestionBox
                        questionId={q._id}
                        likesCount={q.qlikes.length}
                        questionTitle={q.question}
                        answersCount={q.answers.length}
                        tags={q.tags}
                        dataAos={"fade-up"}
                        userObj={q.userdname}
                        date={q.date}
                      />
                    </div>
                  );
                })}
              {!askedquestion && <Spinner />}
            </div>
          </div> */}
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
