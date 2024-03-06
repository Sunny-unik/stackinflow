import React, { useState, useEffect } from "react";
import { checkLogin } from "../../action/userAction";
import setLoading from "../../action/loadingAction";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import ForgotPassword from "./ForgotPassword";
import SetPassword from "./SetPassword";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [path, setPath] = useState("");
  const [id, setId] = useState("");
  const reduxUser = useSelector((state) => state.user);

  useEffect(() => {
    reduxUser && props.history.push("/");
  }, [reduxUser, props.history, path]);

  const dispatch = useDispatch();
  const checkAuth = (event) => {
    event.preventDefault();
    dispatch(checkLogin({ email, password }));
  };

  function sendForgotMail() {
    dispatch(setLoading(true));
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, { email })
      .then((res) => {
        const response = res.data;
        if (response.errors) alert("Please first enter your email or username");
        else if (!response.data)
          alert("Entered email or username are not registered");
        else {
          setId(response.data._id);
          setPath("/forgotPassword");
          alert("Otp sent to your email");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }

  const updatePath = () => {
    !!email.trim()
      ? sendForgotMail()
      : alert("Please first enter your email or username");
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <div className="container logincon">
          {path === "/setPassword" ? (
            <SetPassword id={id} goto={setPath} />
          ) : path === "/forgotPassword" ? (
            <ForgotPassword goto={setPath} _id={id} />
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
                onSubmit={checkAuth}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                    style={{ fontFamily: "sans-serif" }}
                  />
                  <span
                    className="btn align-self-center"
                    onClick={() =>
                      setPasswordType(
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
                <button className="loginBtn">Log In</button>
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
