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
      <div
        style={{
          padding: "3%",
          margin: "4px 0",
          borderRadius: "2%",
          boxShadow: "3px 4px 3px 2px #888888"
        }}
        onSubmit={otpCheck}
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
