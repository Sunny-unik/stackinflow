import axios from "axios";
import React, { useEffect } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import setLoading from "../../action/loadingAction";
import OtpForm from "../OtpForm";

export default function ConfirmEmail({ setInSignup, _id, history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      axios.post(`${process.env.REACT_APP_API_URL}/user/remove-unverified`);
    };
  }, []);

  const otpCheck = (otp) => {
    dispatch(setLoading(true));
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/check-otp`, { otp, _id })
      .then((res) => {
        if (!res.data.message)
          return alert("! Some error occurred on server, try again later");
        history.push("/login");
        alert("User Verified Successfully");
      })
      .catch(({ message, response }) => {
        alert(response?.status === 400 ? response.data.message : message);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div
      data-aos="flip-right"
      data-aos-once="true"
      data-aos-duration="1000"
      className="col-md-5 col-lg-4 mt-4"
    >
      <div className="confirmEmail registerForm" onSubmit={otpCheck}>
        <h1 style={{ display: "inline-block", width: "82%" }}>Confirm Email</h1>
        <button
          onClick={() => setInSignup(true)}
          className="border border-light btn btn-warning float-end shadow p-3 rounded py-2 mt-1"
        >
          <IoArrowUndoOutline />
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
