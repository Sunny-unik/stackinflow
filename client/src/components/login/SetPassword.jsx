import axios from "axios";
import React from "react";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { passwordRegex } from "../../helper/RegexHelper";
import { useDispatch } from "react-redux";
import setLoading from "../../action/loadingAction";

export default function SetPassword({ id, goto }) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const dispatch = useDispatch();

  function otpLogin() {
    if (
      newPassword === confirmPassword &&
      confirmPassword.trim().length <= 16 &&
      passwordRegex.test(confirmPassword)
    ) {
      dispatch(setLoading(true));
      axios
        .put(`${process.env.REACT_APP_API_URL}/user/password`, {
          id,
          newPassword
        })
        .then((res) => {
          alert(res.data.msg);
          goto();
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(setLoading(false)));
    } else {
      alert(
        "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and number of letters must in between 8 to 16 and should same in both textbox"
      );
    }
  }

  return (
    <div
      data-aos="flip-left"
      data-aos-once="true"
      data-aos-duration="1000"
      className="col-md-5 col-lg-4"
      id="loginpass"
    >
      <form
        className="d-inline-block"
        style={{
          padding: "3%",
          margin: "4px 0",
          borderRadius: "2%",
          boxShadow: "3px 4px 3px 4px #888888"
        }}
      >
        <h1>Recreate Password</h1>
        <p>Please fill new password for login your account.</p>
        <hr className="signuphr" />
        <label htmlFor="newpassword" className="newpassword">
          <b>Enter New Password</b>
        </label>
        <div className="d-flex flex-grow-1">
          <input
            className="form-control"
            type={newPasswordType}
            value={newPassword}
            style={{ fontFamily: "sans-serif" }}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="new password"
            name="newpassword"
            id="newpassword"
            required
          />
          <span
            className="btn align-self-center"
            onClick={() =>
              setNewPasswordType(
                newPasswordType === "text" ? "password" : "text"
              )
            }
          >
            {newPasswordType === "text" ? <BsEyeSlashFill /> : <BsEyeFill />}
          </span>
        </div>
        <label htmlFor="confirmpassword" className="confirmpassword">
          <b>Confirm Entered Password</b>
        </label>
        <div className="d-flex flex-grow-1">
          <input
            className="form-control"
            type={confirmPasswordType}
            value={confirmPassword}
            style={{ fontFamily: "sans-serif" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            name="confirmpassword"
            id="confirmpassword"
            required
          />
          <span
            className="btn align-self-center"
            onClick={() =>
              setConfirmPasswordType(
                confirmPasswordType === "text" ? "password" : "text"
              )
            }
          >
            {confirmPasswordType === "text" ? (
              <BsEyeSlashFill />
            ) : (
              <BsEyeFill />
            )}
          </span>
        </div>
        <hr className="signuphr" />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            type="button"
            className="loginBtn updateBtn"
            style={{
              fontFamily: "monospace",
              fontSize: "large",
              width: "46%",
              boxShadow: "2px 3px 2px 3px #888888"
            }}
            onClick={otpLogin}
          >
            Submit
          </button>
          <button
            type="button"
            className="loginBtn cancelBtn"
            style={{
              fontFamily: "monospace",
              fontSize: "large",
              width: "46%",
              boxShadow: "2px 3px 2px 3px #888888"
            }}
            onClick={goto}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
