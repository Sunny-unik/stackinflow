import axios from "axios";
import React, { useRef } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useDispatch } from "react-redux";
import setLoading from "../../action/loadingAction";

export default function ForgotPassword({ goto, _id }) {
  const otpRef = useRef(null);
  const dispatch = useDispatch();

  const otpPassword = (event) => {
    event.preventDefault();
    const otp = otpRef.current.value;
    if (otp.trim().length !== 6) return alert("Otp must be 6 digit number");

    dispatch(setLoading(true));
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/check-otp`, { otp, _id })
      .then(() => {
        alert("You have to create new password");
        goto("/setPassword");
      })
      .catch(({ message, response }) => {
        alert(response.status === 400 ? response.data.message : message);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div
      data-aos="flip-left"
      data-aos-once="true"
      data-aos-duration="1000"
      className="col-md-5 col-lg-4"
      id="loginotp"
    >
      <form
        className="d-inline-block"
        style={{
          padding: "3%",
          margin: "4px 0",
          borderRadius: "2%",
          boxShadow: "3px 4px 3px 2px #888888"
        }}
        onSubmit={otpPassword}
      >
        <h2 style={{ display: "inline-block", width: "82%" }}>
          Forgot Password
        </h2>
        <button
          to="/login"
          type="button"
          className="btn btn-primary float-end m-1"
          onClick={() => goto()}
        >
          <TbArrowBackUp />
        </button>
        <p>Please fill registered email for recover your account.</p>
        <hr className="signuphr" />
        <label htmlFor="otplogin" className="otpemail">
          <b>Enter One Time Password</b>
        </label>
        <input
          style={{ fontFamily: "sans-serif" }}
          type="number"
          ref={otpRef}
          placeholder="Enter 6 digit otp"
          name="otplogin"
          id="otplogin"
          required
        />
        <hr className="signuphr" />
        <button className="loginBtn">Submit</button>
      </form>
    </div>
  );
}
