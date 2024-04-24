import "../../css/registerForm.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { emailRegex, passwordRegex } from "../../helper/RegexHelper";
import ConfirmEmail from "./ConfirmEmail";
import { useDispatch, useSelector } from "react-redux";
import setLoading from "../../action/loadingAction";
import OverlayLoading from "../loadings/OverlayLoading";

export default function Signup(props) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dName, setDName] = useState("");
  const [password, setPassword] = useState("");
  const [inSignup, setInSignup] = useState(true);
  const { user: reduxUser, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    reduxUser && props.history.push("/");
  }, [reduxUser, props.history]);

  const validateUserDetails = (event) => {
    event.preventDefault();
    const errors = [];

    if (!emailRegex.test(email)) errors.push("Email is not valid");
    if (name.trim().length <= 2 || name.trim().length >= 46 || !name.trim())
      errors.push("please enter your name");
    if (
      dName.trim().length < 4 ||
      dName.trim().length > 16 ||
      dName.includes(" ")
    )
      errors.push("username length must between 4to16 & can't include spaces");
    if (!passwordRegex.test(password) || password.length > 16)
      errors.push(
        "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and number of letters must in between 8 to 16"
      );

    errors.length ? alert(errors.join(",\n")) : uniqueEmail();
  };

  const uniqueEmail = () => {
    dispatch(setLoading(true));
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/email`, { email })
      .then(async (res) => {
        if (res.data === "valid email") return await uniqueDName();
        alert("Entered email is already registered");
      })
      .catch(serverErrorHandler)
      .finally(() => dispatch(setLoading(false)));
  };

  const uniqueDName = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/dname`,
        { dname: dName }
      );
      if (result.data === "valid dname") await createAccountAndVerify();
      else alert("Entered username is already registered");
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createAccountAndVerify = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/user`, {
        email,
        name,
        dname: dName,
        password
      });
      if (result.data.message) {
        alert(result.data.message);
        setUserId(result.data.data._id);
        setInSignup(false);
      } else serverErrorHandler();
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const serverErrorHandler = () => {
    alert("! Some error occurred on server, try again later");
  };

  return (
    <React.Fragment>
      {loading && <OverlayLoading />}
      <div className="text-center">
        <div className="container p-0 d-inline-flex justify-content-center w-100">
          {inSignup ? (
            <div
              data-aos="flip-right"
              data-aos-once="true"
              data-aos-duration="500"
              className="col-md-8 col-lg-4"
            >
              <form
                className="signUp registerForm"
                onSubmit={validateUserDetails}
              >
                <h1>Create an account</h1>
                <p>Please fill this form and get verified for register.</p>
                <hr className="skyBlueHr" />
                <label htmlFor="createEmail">
                  <b>Your Email</b>
                </label>
                <input
                  type="email"
                  style={{ fontFamily: "sans-serif" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength="5"
                  placeholder="example@eg.co"
                  name="cEmail"
                  id="createEmail"
                  required
                />
                <label htmlFor="createName">
                  <b>Your Name</b>
                </label>
                <input
                  type="text"
                  style={{ fontFamily: "sans-serif" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="first-name last-name"
                  name="cName"
                  id="createName"
                  required
                />
                <label htmlFor="createDName">
                  <b>Display Name</b>
                </label>
                <input
                  type="text"
                  style={{ fontFamily: "sans-serif" }}
                  value={dName}
                  onChange={(e) => setDName(e.target.value)}
                  placeholder="display_name"
                  name="cDName"
                  id="createDName"
                  required
                />
                <label htmlFor="createPassword">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  style={{ fontFamily: "sans-serif" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  maxLength="16"
                  placeholder="password should be strong"
                  name="cPassword"
                  id="createPassword"
                  required
                />
                <hr className="skyBlueHr" />
                <button className="registerBtn">Sign Up</button>
              </form>
            </div>
          ) : (
            <ConfirmEmail
              history={props.history}
              setInSignup={setInSignup}
              _id={userId}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
AOS.init();
