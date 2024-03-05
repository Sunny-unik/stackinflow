import axios from "axios";
import React, { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";

export default function ForgotPassword({ goto, _id }) {
  const [otp, setOtp] = useState("");

  const otpPassword = () => {
    if (otp.trim().length !== 6) return alert("Otp must be 6 digit number");

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/check-otp`, { otp, _id })
      .then(() => {
        alert("You have to create new password");
        goto("/setPassword");
      })
      .catch((error) => alert(error.message));
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
      >
        <h2 style={{ display: "inline-block", width: "82%" }}>
          Forgot Password
        </h2>
        <button
          to="/login"
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6 digit otp"
          name="otplogin"
          id="otplogin"
          required
        />
        <hr className="signuphr" />
        <button type="reset" className="loginBtn" onClick={otpPassword}>
          Submit
        </button>
      </form>
    </div>
  );
}
