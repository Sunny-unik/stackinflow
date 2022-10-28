import React, { useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Askedquestions from "./profile/Askedquestions";
import Givenanswer from "./profile/Givenaswer";
import Editprofile from "./profile/Editprofile";
import Likedquestions from "./profile/Likedquestions";
import Footer from "./Footer";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FcCollaboration } from "react-icons/fc";

export default function Profile() {
  const user = useSelector((state) => state.user);

  if (!user && !localStorage.getItem("stackinflowToken"))
    window.location.pathname = "/login";

  const {
    _id: userId,
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
    uprofile
  } = user ? user : [null];

  const [uploadPercentage, setuploadPercentage] = useState("");
  let profile;
  const uploadProfile = (e) => (profile = e.target.files[0]);

  function sendvalues() {
    if (!profile) {
      alert("please select a profile");
      return false;
    }
    const formData = new FormData();
    formData.append("uid", userId);
    formData.append("profile", profile);
    axios
      .post(`${process.env.REACT_APP_API_URL}/update-user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (progressEvent) {
          console.log("file Uploading Progresss.......");
          console.log(progressEvent);
          setuploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          );
          //setfileInProgress(progressEvent.fileName)
        }
      })
      .then((res) => alert(res.data.data))
      .catch((err) => alert("Operation failed beacuse: ", err));
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="d-md-flex">
          <div className="col-md-5 col-sm-10 text-center col-lg-4 mx-auto proimgdiv">
            <br />
            <div
              className="profilepic w-75 m-auto"
              data-aos="flip-up"
              data-aos-once="true"
              data-aos-duration="600"
            >
              <img
                className="col-sm-12 m-auto"
                height="225rem"
                width="225rem"
                src={
                  uprofile
                    ? `${process.env.REACT_APP_API_URL}/${uprofile}`
                    : "assets/img/profile.jpg"
                }
                alt="user profile"
              />
              <input
                type="file"
                className="btn btn-primary col-sm-12 my-2"
                accept="image/png,image/jpg,image/jpeg"
                onChange={(e) => uploadProfile(e)}
              />
              {uploadPercentage} {uploadPercentage && "% uploaded"}
              <div className="w-100 m-0 p-0 text-center">
                <button
                  type="button"
                  className="updateprofile btn btn-success col-sm-12"
                  onClick={sendvalues}
                >
                  Update Profile Picture
                </button>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="600"
            className="px-md-4 col-md-8 col-lg-7 col-sm-12 procontent"
          >
            <br />
            <div className="text-center">
              <label style={{ fontFamily: "SeogUI" }}>User's Name</label>
              <div>
                <h2
                  className="my-0"
                  style={{ fontFamily: "Sans-Serif", fontWeight: "bold" }}
                >
                  {name}
                </h2>
              </div>
              <label style={{ fontFamily: "SeogUI" }}>Display Name</label>
              <div>
                <h3 style={{ fontFamily: "Sans-Serif", fontWeight: "bold" }}>
                  {dname}
                </h3>
              </div>
              {title && (
                <div>
                  <label style={{ fontFamily: "SeogUI" }}>Work Title</label>
                  <h3>{title}</h3>
                </div>
              )}
              <label style={{ fontFamily: "SeogUI" }}>User Email</label>
              <h3 style={{ fontFamily: "Sans-Serif", fontWeight: "bold" }}>
                {email}
              </h3>
              {address && (
                <div>
                  <label style={{ fontFamily: "SeogUI" }}>Address</label>
                  <h4 style={{ fontFamily: "Sans-Serif" }}>
                    <IoLocationSharp /> {address}
                  </h4>{" "}
                </div>
              )}
              <h4>
                {weblink && (
                  <a target="_blank" href={weblink} rel="noreferrer">
                    <abbr title={weblink}>
                      <FcCollaboration />
                    </abbr>
                  </a>
                )}{" "}
                &middot;{" "}
                {gitlink && (
                  <a target="_blank" href={gitlink} rel="noreferrer">
                    <abbr title={gitlink}>
                      <FaGithub />
                    </abbr>
                  </a>
                )}{" "}
                &middot;{" "}
                {twitter && (
                  <a target="_blank" href={twitter} rel="noreferrer">
                    <abbr title={twitter}>
                      <FaTwitter />
                    </abbr>
                  </a>
                )}{" "}
              </h4>
              <h4 style={{ fontFamily: "SeogUI", fontWeight: "bold" }}>
                Total Points: {user && (userlikes === null ? 0 : userlikes)}
              </h4>
              <br />
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          {about && (
            <div>
              <label>
                <h1>About </h1>
              </label>
              <h3>{about} </h3>
            </div>
          )}
        </div>
      </div>
      <br />
      <div>
        {user && (
          <div className="row w-100 m-auto">
            <div className="d-flex flex-xs-column flex-md-row justify-content-center content py-2 bg-dark rounded">
              <div
                data-aos="zoom-out"
                data-aos-once="true"
                data-aos-duration="600"
                className="d-flex flex-sm-column flex-md-row text-center"
              >
                <p className="mx-1 my-auto px-1">
                  <NavLink
                    className="btn text-primary rounded p-1"
                    activeClassName="active"
                    to="/profile"
                    style={{ fontSize: "large" }}
                  >
                    Liked Questions
                  </NavLink>
                </p>
                <p className="mx-1 my-auto px-1">
                  <NavLink
                    className="btn text-primary rounded p-1"
                    activeClassName="active"
                    to="/profile/editprofile"
                    style={{ fontSize: "large" }}
                  >
                    Edit Profile
                  </NavLink>
                </p>
                <p className="mx-1 my-auto px-1">
                  <NavLink
                    className="btn text-primary rounded p-1"
                    activeClassName="active"
                    to="/profile/selfquestion"
                    style={{ fontSize: "large" }}
                  >
                    Asked Questions
                  </NavLink>
                </p>
                <p className="mx-1 my-auto px-1">
                  <NavLink
                    className="btn text-primary rounded p-1"
                    activeClassName="active"
                    to="/profile/selfanswer"
                    style={{ fontSize: "large" }}
                  >
                    Given Answers
                  </NavLink>
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-sm-10">
                <Switch>
                  <Route path="/profile" exact component={Likedquestions} />
                  <Route path="/profile/editProfile" component={Editprofile} />
                  <Route path="/profile/questions" component={Askedquestions} />
                  <Route path="/profile/answers" component={Givenanswer} />
                </Switch>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
AOS.init();
