import React, { useState, useEffect } from "react";
import { checkLogin } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import ForgotPassword from "./forgotPassword";
import SetPassword from "./setPassword";
import axios from "axios";

export default function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordType, setpasswordType] = useState("password");
  const [path, setpath] = useState("");
  const [id, setid] = useState("");
  const [otp, setotp] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const reduxUser = useSelector((state) => state.user);

  useEffect(() => {
    reduxUser && props.history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxUser, path]);

  const dispatch = useDispatch();
  const checkAuth = () => dispatch(checkLogin({ email, password }));

  function sendOtp() {
    if (email.trim() === "") {
      alert("first enter your email or username");
      return false;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/otp-mail`, {
        email: email
      })
      .then((res) => {
        const response = res.data;
        if (response.errors) alert(response.message);
        else if (!response)
          alert("Entered email or username are not registered");
        else {
          setoldPassword(response.data.password);
          setid(response.data._id);
          setotp(response.otp);
          setpath("/forgotPassword");
          alert("otp sent to your email");
        }
      })
      .catch((err) => console.log(err));
  }

  const updatePath = () => {
    email.trim()
      ? sendOtp()
      : alert("Please first enter your email or username");
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <div className="container logincon">
          {path === "/setPassword" ? (
            <SetPassword password={oldPassword} id={id} goto={setpath} />
          ) : path === "/forgotPassword" ? (
            <ForgotPassword originalOtp={otp} goto={setpath} />
          ) : (
            <div
              data-aos="flip-left"
              data-aos-once="true"
              data-aos-duration="500"
              className="col-md-5 col-lg-4 "
              id="logindetail"
            >
              <form
                className="d-inline-block"
                style={{
                  padding: "3%",
                  margin: "4px 0",
                  borderRadius: "2%",
                  boxShadow: "4px 4px 3px 3px #888888"
                }}
              >
                <h1>Log In</h1>
                <p>Please fill log in details for login your account.</p>
                <hr className="signuphr" />
                <label htmlFor="email">
                  <b>Registered Email Or Username</b>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="example@eg.com"
                  name="email"
                  style={{ fontFamily: "sans-serif" }}
                  id="email"
                  required
                />
                <label htmlFor="password" className="form-label">
                  Your Password
                </label>
                <div className="d-flex flex-grow-1">
                  <input
                    className="form-control"
                    type={passwordType}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                    style={{ fontFamily: "sans-serif" }}
                  />
                  <span
                    className="btn align-self-center"
                    onClick={() =>
                      setpasswordType(
                        passwordType === "text" ? "password" : "text"
                      )
                    }
                  >
                    {passwordType === "text" ? (
                      <BsEyeSlashFill />
                    ) : (
                      <BsEyeFill />
                    )}
                  </span>
                </div>
                <hr className="signuphr" />
                <button
                  type="button"
                  className="loginBtn"
                  onClick={() => checkAuth()}
                >
                  Log In
                </button>
                <hr className="signuphr" />
                <p className="forgotPasswordLink" onClick={updatePath}>
                  Forgot Password ?
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
AOS.init();
