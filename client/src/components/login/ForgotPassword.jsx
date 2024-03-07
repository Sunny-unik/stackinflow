import React from "react";
import axios from "axios";
import { TbArrowBackUp } from "react-icons/tb";
import { useDispatch } from "react-redux";
import setLoading from "../../action/loadingAction";
import OtpForm from "../OtpForm";

export default function ForgotPassword({ goto, _id }) {
  const dispatch = useDispatch();

  const otpCheck = (otp) => {
    dispatch(setLoading(true));
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/check-otp`, { otp, _id })
      .then(() => {
        alert("You have to create new password");
        goto("/setPassword");
      })
      .catch(({ message, response }) => {
        alert(response?.status === 400 ? response.data.message : message);
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
      <div
        style={{
          padding: "3%",
          margin: "4px 0",
          borderRadius: "2%",
          boxShadow: "3px 4px 3px 2px #888888"
        }}
        onSubmit={otpCheck}
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
        <p>Otp sent on given email-address.</p>
        <hr className="signuphr" />
        <OtpForm
          onSubmitHandle={otpCheck}
          otpLength={6}
          inputType={"number"}
          labelText="Please fill 6 digit code to verify your account."
        />
        <hr className="signuphr" />
      </div>
    </div>
  );
}
