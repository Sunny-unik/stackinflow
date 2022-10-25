import React, { useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { emailRegex, passwordRegex } from "../helper/RegexHelper";

export default function Signup(props) {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [dname, setdname] = useState("");
  const [password, setpassword] = useState("");
  const [otp, setotp] = useState("");
  const [randomotp, setrandomotp] = useState("");

  function setvalue(e) {
    e.target.name === "cemail" && setemail(e.target.value);
    e.target.name === "cname" && setname(e.target.value);
    e.target.name === "cdname" && setdname(e.target.value);
    e.target.name === "cpassword" && setpassword(e.target.value);
    e.target.name === "otp" && setotp(e.target.value);
  }

  function unikemail() {
    const em = { email };
    axios
      .post(`${process.env.REACT_APP_API_URL}/valid-email`, em)
      .then((res) => {
        res.data.status === "ok" ? unikdname() : alert(res.data.data);
      });
  }

  function unikdname() {
    const dn = { dname };
    axios
      .post(`${process.env.REACT_APP_API_URL}/valid-dname`, dn)
      .then((res) => {
        res.data.status === "ok" ? hidereg() : alert(res.data.data);
      });
  }

  function hidereg() {
    let isValid = true;
    if (!emailRegex.test(email)) {
      isValid = false;
      alert("Email is not valid");
    }
    if (name.trim().length <= 2 || name.trim().length >= 46 || !name.trim()) {
      isValid = false;
      alert("please enter your name");
    }
    if (name.trim().length <= 4 || name.trim().length >= 16 || !name.trim()) {
      isValid = false;
      alert("please enter username");
    }
    if (!passwordRegex.test(password)) {
      alert(
        "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and number of letters must in between 8 to 16"
      );
      isValid = false;
    }
    if (isValid === true) {
      const random = Math.floor(Math.random() * 1000000 + 1);
      setrandomotp(random);
      axios
        .post(`${process.env.REACT_APP_API_URL}/send-user-otp`, {
          email,
          otp: random
        })
        .then((res) => {
          if (res.data.status === "ok") {
            alert("otp sent to your email");
            document.getElementById("createdetail").style.display = "none";
            document.getElementById("createotp").style.display = "block";
          } else alert("some server error occured");
        });
    }
  }

  function create() {
    const userlikes = 0;
    const profile = null;
    const s = {
      email,
      name,
      dname,
      password,
      userlikes,
      profile
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/create-user`, s)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Registration Successfull");
          props.history.push("/login");
        } else {
          alert("! some server error occured try again ");
          props.history.push("/signup");
        }
      });
  }

  function otpcheck() {
    if (otp === randomotp) {
      create();
    } else {
      alert("! incorrect otp ");
      props.history.push("/signup");
    }
  }

  function goreg() {
    document.getElementById("createotp").style.display = "none";
    document.getElementById("createdetail").style.display = "block";
  }

  return (
    <React.Fragment>
      <div className="text-center">
        <div className="container signupcon">
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
            >
              <h1>Create an account</h1>
              <p>Please fill this form and get verified for register.</p>
              <hr className="signuphr" />
              <label htmlFor="createemail">
                <b>Your Email</b>
              </label>
              <input
                type="email"
                style={{ fontFamily: "sans-serif" }}
                value={email}
                onChange={(e) => setvalue(e)}
                minlength="5"
                placeholder="example@eg.co"
                name="cemail"
                id="createemail"
                required
              />
              <label htmlFor="createname">
                <b>Your Name</b>
              </label>
              <input
                type="text"
                style={{ fontFamily: "sans-serif" }}
                value={name}
                onChange={(e) => setvalue(e)}
                placeholder="firstname lastname"
                name="cname"
                id="createname"
                required
              />
              <label htmlFor="createdname">
                <b>Display Name</b>
              </label>
              <input
                type="text"
                style={{ fontFamily: "sans-serif" }}
                value={dname}
                onChange={(e) => setvalue(e)}
                placeholder="display_name"
                name="cdname"
                id="createdname"
                required
              />
              <label htmlFor="createpassword">
                <b>Password</b>
              </label>
              <input
                type="password"
                style={{ fontFamily: "sans-serif" }}
                value={password}
                onChange={(e) => setvalue(e)}
                minlength="8"
                maxLength="16"
                placeholder="password should be strong"
                name="cpassword"
                id="createpassword"
                required
              />
              <hr className="signuphr" />
              <button type="button" className="registerbtn" onClick={unikemail}>
                {" "}
                Sign Up{" "}
              </button>
            </form>
          </div>
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
              <h1 style={{ display: "inline-block", width: "82%" }}>
                Confirm Email
              </h1>
              <button
                type="button"
                onClick={goreg}
                className="border btn btn-warning float-end"
                style={{
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                  padding: "2% 1%",
                  margin: "0",
                  borderRadius: "10%",
                  boxShadow: "2px 3px 2px 3px #888888"
                }}
              >
                {" "}
                Go Back{" "}
              </button>
              <p>Please fill 6alphanumeric code for create your account.</p>
              <hr className="signuphr" />
              <label htmlFor="otp" className="inputotp">
                <b>Otp sent on gievn email-address</b>
              </label>
              <input
                style={{ fontFamily: "sans-serif" }}
                type="text"
                value={otp}
                onChange={(e) => setvalue(e)}
                placeholder="Enter Verfication Code"
                name="otp"
                id="otp"
                required
              />
              <hr className="signuphr" />
              <button type="button" className="registerbtn" onClick={otpcheck}>
                {" "}
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
AOS.init();
