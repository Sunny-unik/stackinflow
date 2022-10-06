import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Askedquestions from "./profile/Askedquestions";
import Givenanswer from "./profile/Givenaswer";
import Editprofile from "./profile/Editprofile";
import Likedquestions from "./profile/Likedquestions";
import Footer from "./Footer";
import {
  FaGithub,
  FaHome,
  FaQuestion,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTags,
  FaTwitter,
  FaUsers,
  FaUserTie,
  FaWindowClose
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FcCollaboration, FcMenu } from "react-icons/fc";

export default function Profile(props) {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    closeSlideMenu();
    if (user === null) {
      alert("User need to login first");
    }
  });
  console.log(user);

  const uname = useSelector((state) => state.user.name);
  const udname = useSelector((state) => state.user.dname);
  const uemail = useSelector((state) => state.user.email);
  const utitle = useSelector((state) => state.user.title);
  const uabout = useSelector((state) => state.user.about);
  const weblink = useSelector((state) => state.user.weblink);
  const gitlink = useSelector((state) => state.user.gitlink);
  const twitter = useSelector((state) => state.user.twitter);
  const uaddress = useSelector((state) => state.user.address);
  const uprofile = useSelector((state) => state.user.profile);

  let profile;
  const [uploadPercentage, setuploadPercentage] = useState("");

  const [name, setname] = useState(uname);
  const [dname, setdname] = useState(udname);
  const [email, setemail] = useState(uemail);
  const [title, settitle] = useState(utitle);
  const [about, setabout] = useState(uabout);
  const [website, setwebsite] = useState(weblink);
  const [githublink, setgithublink] = useState(gitlink);
  const [twitterlink, settwitterlink] = useState(twitter);
  const [address, setaddress] = useState(uaddress);

  function openSlideMenu() {
    document.getElementById("sidemenuopen").style.display = "none";
    document.getElementById("sidemenuclose").style.display = "block";
    document.getElementById("hiddennav").style.display = "block";
  }
  function closeSlideMenu() {
    document.getElementById("sidemenuclose").style.display = "none";
    document.getElementById("sidemenuopen").style.display = "block";
    document.getElementById("hiddennav").style.display = "none";
  }

  const dispatch = useDispatch();
  function logout() {
    dispatch({ type: "LOGOUT_USER" });
    alert("User successfully logout");
  }

  function sidelink() {
    if (user) {
      props.history.push("/askaquestion");
      closeSlideMenu();
    } else {
      alert("User need to login first");
    }
  }

  function setProfile(e) {
    profile = e.target.files[0];
    console.log(profile);
  }

  function sendvalues() {
    if (profile !== undefined) {
      const formData = new FormData();
      formData.append("obid", user._id);
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
        .then((res) => {
          alert(res.data.data);
        })
        .catch((res) => {
          alert("sorry you are not authorised to do this action");
        });
    } else {
      alert("please choose profile");
    }
  }

  return (
    <React.Fragment>
      <button
        type="button"
        id="sidemenuopen"
        className="m-1 fixed-top btn-info rounded"
        onClick={openSlideMenu}
      >
        <FcMenu />
      </button>
      <button
        type="button"
        id="sidemenuclose"
        className="m-1 fixed-top btn-dark rounded"
        onClick={closeSlideMenu}
      >
        <FaWindowClose />
      </button>
      <div id="hiddennav" className="py-2 px-2">
        <NavLink
          activeclassname="active1"
          exact
          to="/"
          onClick={closeSlideMenu}
        >
          <FaHome /> Home{" "}
        </NavLink>
        <br />
        <br />
        <NavLink
          activeclassname="active1"
          to="/questions"
          onClick={closeSlideMenu}
        >
          <FaQuestionCircle /> Questions{" "}
        </NavLink>
        <br />
        <br />
        <NavLink
          activeclassname="active1"
          to="/populartags"
          onClick={closeSlideMenu}
        >
          <FaTags /> Popular Tags{" "}
        </NavLink>
        <br />
        <br />
        <span
          activeclassname="active1"
          className="extralink"
          style={{ fontSize: "inherit", fontFamily: "sans-serif" }}
          onClick={sidelink}
        >
          <FaQuestion /> Ask Question{" "}
        </span>
        <br />
        <br />
        <NavLink
          activeclassname="active1"
          to="/popularusers"
          onClick={closeSlideMenu}
        >
          <FaUsers /> Popular Users{" "}
        </NavLink>
        <br />
        <br />
        <NavLink
          activeclassname="active1"
          to="/Profile"
          onClick={closeSlideMenu}
        >
          <FaUserTie /> Profile{" "}
        </NavLink>
        <br />
        <br />
        <NavLink activeclassname="active1" onClick={logout} to="/Login">
          <FaSignOutAlt /> LogOut{" "}
        </NavLink>
        <br />
        <br />
      </div>

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
                    : "assets/img/download.jpg"
                }
                alt="user profile"
              />
              <input
                type="file"
                className="btn btn-primary col-sm-12 my-2"
                accept="image/png,image/jpg,image/jpeg"
                onChange={(e) => setProfile(e)}
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
                    <IoLocationSharp />
                    &nbsp;{address}
                  </h4>{" "}
                </div>
              )}
              <h4>
                {website && (
                  <a target="_blank" href={website} rel="noreferrer">
                    <abbr title={website}>
                      <FcCollaboration />
                    </abbr>
                  </a>
                )}
                &nbsp;&middot;&nbsp;
                {githublink && (
                  <a target="_blank" href={githublink} rel="noreferrer">
                    <abbr title={githublink}>
                      <FaGithub />
                    </abbr>
                  </a>
                )}
                &nbsp;&middot;&nbsp;
                {twitterlink && (
                  <a target="_blank" href={twitterlink} rel="noreferrer">
                    <abbr title={twitterlink}>
                      <FaTwitter />
                    </abbr>
                  </a>
                )}
                &nbsp;
              </h4>
              <h4 style={{ fontFamily: "SeogUI", fontWeight: "bold" }}>
                Total Points : {user.userlikes === null ? 0 : user.userlikes}{" "}
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
              <h3>{about}</h3>{" "}
            </div>
          )}
        </div>
      </div>
      <br />
      <div>
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
                  activeclassname="active"
                  to="/Profile"
                  style={{ fontSize: "large" }}
                >
                  Liked Questions
                </NavLink>
              </p>
              <p className="mx-1 my-auto px-1">
                <NavLink
                  className="btn text-primary rounded p-1"
                  activeclassname="active"
                  to="/Profile/editprofile"
                  style={{ fontSize: "large" }}
                >
                  Edit Profile
                </NavLink>
              </p>
              <p className="mx-1 my-auto px-1">
                <NavLink
                  className="btn text-primary rounded p-1"
                  activeclassname="active"
                  to="/Profile/selfquestion"
                  style={{ fontSize: "large" }}
                >
                  Asked Questions
                </NavLink>
              </p>
              <p className="mx-1 my-auto px-1">
                <NavLink
                  className="btn text-primary rounded p-1"
                  activeclassname="active"
                  to="/Profile/selfanswer"
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
                <Route path="/Profile" exact component={Likedquestions} />
                <Route path="/Profile/editprofile" component={Editprofile} />
                <Route
                  path="/Profile/selfquestion"
                  component={Askedquestions}
                />
                <Route path="/Profile/selfanswer" component={Givenanswer} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
AOS.init();
