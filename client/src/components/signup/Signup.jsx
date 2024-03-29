import React, { useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { emailRegex, passwordRegex } from "../../helper/RegexHelper";
import ConfirmEmail from "./ConfirmEmail";
import { useDispatch } from "react-redux";
import setLoading from "../../action/loadingAction";

export default function Signup(props) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dname, setDname] = useState("");
  const [password, setPassword] = useState("");
  const [inSignup, setInSignup] = useState(true);
  const dispatch = useDispatch();

  const validateUserDetails = (event) => {
    event.preventDefault();
    const errors = [];

    if (!emailRegex.test(email)) errors.push("Email is not valid");
    if (name.trim().length <= 2 || name.trim().length >= 46 || !name.trim())
      errors.push("please enter your name");
    if (
      dname.trim().length < 4 ||
      dname.trim().length > 16 ||
      dname.includes(" ")
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
        if (res.data === "valid email") return await uniqueDname();
        alert("Entered email is already registered");
      })
      .catch(serverErrorHandler)
      .finally(() => dispatch(setLoading(false)));
  };

  const uniqueDname = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/dname`,
        { dname }
      );
      if (result.data === "valid dname") await createAccountAndVerify();
      else alert("Entered username is already registered");
    } catch (error) {
      throw error;
    }
  };

  const createAccountAndVerify = async () => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/user`, {
        email,
        name,
        dname,
        password
      });
      if (result.data.message) {
        alert(result.data.message);
        setUserId(result.data.data._id);
        setInSignup(false);
      } else serverErrorHandler();
    } catch (error) {
      throw error;
    }
  };

  const serverErrorHandler = () => {
    alert("! Some error occurred on server, try again later");
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <div className="container signupcon">
          {inSignup ? (
            <div
              data-aos="flip-right"
              data-aos-once="true"
              data-aos-duration="500"
              className="col-md-8 col-lg-4 "
              id="createdetail"
            >
              <form
                style={{
                  padding: "3%",
                  margin: "4px 0",
                  borderRadius: "2%",
                  boxShadow: "3px 4px 3px 3px #888888"
                }}
                onSubmit={validateUserDetails}
              >
                <h1>Create an account</h1>
                <p>Please fill this form and get verified for register.</p>
                <hr className="signuphr" />
                <label htmlFor="createemail">Your Email</label>
                <input
                  type="email"
                  style={{ fontFamily: "sans-serif" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength="5"
                  placeholder="example@eg.co"
                  name="cemail"
                  id="createemail"
                  required
                />
                <label htmlFor="createname">Your Name</label>
                <input
                  type="text"
                  style={{ fontFamily: "sans-serif" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="firstname lastname"
                  name="cname"
                  id="createname"
                  required
                />
                <label htmlFor="createdname">Display Name</label>
                <input
                  type="text"
                  style={{ fontFamily: "sans-serif" }}
                  value={dname}
                  onChange={(e) => setDname(e.target.value)}
                  placeholder="display_name"
                  name="cdname"
                  id="createdname"
                  required
                />
                <label htmlFor="createpassword">Password</label>
                <input
                  type="password"
                  style={{ fontFamily: "sans-serif" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  maxLength="16"
                  placeholder="password should be strong"
                  name="cpassword"
                  id="createpassword"
                  required
                />
                <hr className="signuphr" />
                <button className="registerbtn">Sign Up</button>
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
