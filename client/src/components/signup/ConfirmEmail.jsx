import axios from "axios";
import React, { useRef } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";

export default function ConfirmEmail({ setInSignup, _id, history }) {
  const otp = useRef(null);

  const otpCheck = () => {
    const validOtp = otp.current.value.trim();
    if (validOtp.length !== 6) return alert("Otp must be 6 digit number");

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/check-otp`, {
        otp: validOtp,
        _id
      })
      .then((res) => {
        if (!res.data.message)
          return alert("! Some error occurred on server, try again later");
        history.push("/login");
        alert("User Verified Successfully");
      })
      .catch(({ message, response }) => {
        alert(response.status === 400 ? response.data.message : message);
      });
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
          onClick={() => setInSignup(true)}
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
          ref={otp}
          placeholder="Enter 6 Digit OTP"
          id="otp"
          required
        />
        <hr className="signuphr" />
        <button type="button" className="registerbtn" onClick={otpCheck}>
          Submit
        </button>
      </form>
    </div>
  );
}
