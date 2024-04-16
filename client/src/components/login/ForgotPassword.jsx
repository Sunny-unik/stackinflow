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
    >
      <div className="registerForm">
        <h2 style={{ display: "inline-block", width: "82%" }}>
          Forgot Password
        </h2>
        <button
          className="border border-light btn btn-warning float-end shadow p-3 rounded py-2 mt-1"
          onClick={() => goto()}
        >
          <TbArrowBackUp />
        </button>
        <p>Otp sent on given email-address.</p>
        <hr className="skyBlueHr" />
        <OtpForm
          onSubmitHandle={otpCheck}
          otpLength={6}
          inputType={"number"}
          labelText="Please fill 6 digit code to verify your account."
        />
        <hr className="skyBlueHr" />
      </div>
    </div>
  );
}
