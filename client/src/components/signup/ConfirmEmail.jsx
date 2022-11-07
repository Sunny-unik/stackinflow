import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";

export default function ConfirmEmail(props) {
  const [otp, setotp] = useState("");
  const callback = props.setisSignup;
  const userInfo = props.userInfo;
  const randomOtp = useRef();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/send-otp`)
      .then((res) => {
        console.log(res.data.otp);
        randomOtp.current = res.data.otp;
        alert("Otp sent to your email");
      })
      .catch((err) => {
        console.log(err);
        alert("! some server error occured try again later");
        callback(true);
      });
  }, [callback]);

  const otpcheck = () =>
    otp === randomOtp.current ? createAccount() : incorrectOtp();

  const createAccount = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user`, userInfo)
      .then((res) => {
        if (res.data.msg) {
          alert("Registration Successfull");
          props.history.push("/login");
        } else {
          alert("! some server error occured try again later");
          callback(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const incorrectOtp = () => {
    alert("! Incorrect OTP ");
    callback(true);
  };

  return (
    <div
      data-aos="flip-right"
      data-aos-once="true"
      data-aos-duration="1000"
      className="col-md-5 col-lg-4"
      id="createotp"
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
        <h1 style={{ display: "inline-block", width: "82%" }}>Confirm Email</h1>
        <button
          type="button"
          onClick={() => callback(true)}
          className="border btn btn-warning float-end p-2 px-3"
          style={{
            fontWeight: "600",
            fontFamily: "sans-serif",
            padding: "2% 1%",
            margin: "0",
            borderRadius: "10%",
            boxShadow: "2px 3px 2px 3px #888888"
          }}
        >
          <IoArrowUndoOutline />
        </button>
        <p>Please fill 6alphanumeric code for create your account.</p>
        <hr className="signuphr" />
        <label htmlFor="otp" className="inputotp">
          Otp sent on gievn email-address
        </label>
        <input
          style={{ fontFamily: "sans-serif" }}
          type="number"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
          placeholder="Enter 6 Digit OTP"
          id="otp"
          required
        />
        <hr className="signuphr" />
        <button type="button" className="registerbtn" onClick={otpcheck}>
          Submit
        </button>
      </form>
    </div>
  );
}
