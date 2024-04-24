import React, { useRef, useState } from "react";
import { useLocation, Switch, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../css/profile.css";
import axios from "axios";
import AskedQuestions from "./AskedQuestions";
import GivenAnswers from "./GivenAnswers";
import EditProfile from "./EditProfile";
import LikedQuestions from "./LikedQuestions";
import Footer from "../Footer";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FcCollaboration } from "react-icons/fc";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const {
    _id,
    name,
    dname,
    email,
    title,
    about,
    weblink,
    gitlink,
    twitter,
    address,
    userlikes,
    profile
  } = user || {};
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const profileInput = useRef(null);
  const currentPath = useLocation().pathname.split("/").at(-1);

  const sendValues = () => {
    const selectedProfile = profileInput.current?.files[0];
    if (!selectedProfile) return alert("Please select a profile picture first");
    const formData = new FormData();
    formData.append("uid", _id);
    formData.append("profile", selectedProfile);
    axios
      .post(`${process.env.REACT_APP_API_URL}/update-user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          console.log("file Uploading Progress.......", progressEvent);
          setUploadPercentage(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        }
      })
      .then((res) => alert(res.data.data))
      .catch(() => alert("Server error, try again later"))
      .finally(() => setUploadPercentage(0));
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="d-md-flex">
          <div className="col-md-5 col-sm-10 text-center col-lg-4 mx-auto">
            <div
              className="w-75 m-auto pt-4"
              data-aos="flip-up"
              data-aos-once="true"
              data-aos-duration="600"
            >
              <img
                className="col-sm-12 m-auto"
                height="225"
                width="225"
                src={
                  profile
                    ? `${process.env.REACT_APP_API_URL}/${profile}`
                    : "assets/img/profile.jpg"
                }
                alt="user profile"
              />
              <input
                type="file"
                className="btn btn-primary my-2 w-100"
                accept="image/png,image/jpg,image/jpeg"
                ref={profileInput}
              />
              <button className="btn btn-success w-100" onClick={sendValues}>
                Update Profile Picture
              </button>
              {uploadPercentage ? `${uploadPercentage}% uploaded` : null}
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="600"
            className="px-md-4 pt-4 col-md-8 col-lg-7 col-sm-12 profileContent text-center"
          >
            <label htmlFor="user_name">User's Name</label>
            <h2 id="user_name">{name}</h2>
            <label htmlFor="user_dName">Display Name</label>
            <h3 id="user_dName">{dname}</h3>
            {title && (
              <>
                <label htmlFor="user_title">Title</label>
                <h3 id="user_title">{title}</h3>
              </>
            )}
            <label htmlFor="user_email">User Email</label>
            <h3 className="user_email">{email}</h3>
            {address && (
              <>
                <label htmlFor="user_address">Address</label>
                <h4 id="user_address">
                  <IoLocationSharp /> {address}
                </h4>
              </>
            )}
            <hr />
            {weblink || gitlink || twitter ? (
              <div className="fw-bold fs-4 mb-2 d-flex justify-content-center gap-2">
                {weblink && "#" !== weblink && (
                  <a target="_blank" href={weblink} rel="noreferrer">
                    <abbr title={weblink}>
                      <FcCollaboration />
                    </abbr>
                  </a>
                )}
                {gitlink && "#" !== gitlink && (
                  <a target="_blank" href={gitlink} rel="noreferrer">
                    <abbr title={gitlink}>
                      <FaGithub />
                    </abbr>
                  </a>
                )}
                {twitter && "#" !== twitter && (
                  <a target="_blank" href={twitter} rel="noreferrer">
                    <abbr title={twitter}>
                      <FaTwitter />
                    </abbr>
                  </a>
                )}
              </div>
            ) : null}
            <h4>
              Total Points: {user && (userlikes === null ? 0 : userlikes)}
            </h4>
          </div>
        </div>
        {about && (
          <div className="col-sm-12">
            <label htmlFor="user_about">About</label>
            <h3 id="user_about">{about}</h3>
          </div>
        )}
      </div>
      <hr className="mb-0" />
      {user && (
        <div className="px-0 container row mx-auto">
          <div
            id="profile-tabs-bar"
            className="d-flex flex-md-column col-md-2 gap-1 justify-content-start align-items-end py-2 pe-1 sticky-md-top"
          >
            <NavLink
              className={
                "fw-bold rounded text-md-end " +
                (currentPath === "profile" ? "customActive" : "")
              }
              to="/profile"
            >
              Liked Questions
            </NavLink>
            <NavLink
              className={
                "fw-bold rounded text-md-end " +
                (currentPath === "edit" ? "customActive" : "")
              }
              to="/profile/edit"
            >
              Edit Profile
            </NavLink>
            <NavLink
              className={
                "fw-bold rounded text-md-end " +
                (currentPath === "questions" ? "customActive" : "")
              }
              to="/profile/questions"
            >
              Asked Questions
            </NavLink>
            <NavLink
              className={
                "fw-bold rounded text-md-end " +
                (currentPath === "answers" ? "customActive" : "")
              }
              to="/profile/answers"
            >
              Given Answers
            </NavLink>
          </div>
          <div className="d-flex col-md-10 justify-content-center ps-0">
            <div className="w-100">
              <Switch>
                <Route path="/profile" exact component={LikedQuestions} />
                <Route path="/profile/edit" component={EditProfile} />
                <Route path="/profile/questions" component={AskedQuestions} />
                <Route path="/profile/answers" component={GivenAnswers} />
              </Switch>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
}
AOS.init();
