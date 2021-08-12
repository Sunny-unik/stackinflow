import "./css/login.css"
// import axios from 'axios'
import React, { useState } from 'react'

export default function Login(props) {

    const [email, setemail] = useState("")
    const [otp, setotp] = useState("")
    const [password, setpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    function setvalue(e) {
        e.target.name === "email" && setemail(e.target.value)
        e.target.name === "otp" && setotp(e.target.value)
        e.target.name === "password" && setpassword(e.target.value)
        e.target.name === "newpassword" && setnewpassword(e.target.value)
        e.target.name === "confirmpassword" && setconfirmpassword(e.target.value)
    }

    function checkauth(props) {

        console.log("your fun working ")
        // props.history.push('/')
    }
    function forgotpass(){
        console.log("forgot password attempted")
        // var forgotpass = document.getElementsByClassName('logindetial');
        // forgotpass.style.display = "none";
        // var forgotpass2 = document.getElementsByClassName('loginotp');
        // forgotpass2.style.display = "block";
    }
    function otppassword() {

        console.log("your otp time")
        // var logotp = document.getElementsByClassName('loginotp');
        // logotp.style.display = "none";
        // var logotp2 = document.getElementsByClassName('loginpass');
        // logotp2.style.display = "block";
    }
    function otplogin(props) {

        console.log("your password working ")
        // props.history.push('/')
    }
    return (
        <div className="container logincon column">
            <div className="col-md-5 col-lg-4 logindetail" >
                <form className="d-inline-block ">
                    <h1>Log In</h1>
                    <p>Please fill log in details for login your account.</p>
                    <hr className="signuphr" />
                    <label for="email"><b>Registered Email</b></label>
                    <input type="email" value={email} onChange={(e) => { setvalue(e); }} minlength="5" placeholder="example@eg.com" name="email" id="email" required />
                    <label for="password"><b>Your   Password</b></label>
                    <input type="password" value={password} onChange={(e) => { setvalue(e); }} minlength="8" maxLength="16" placeholder="password" name="password" id="password" required />
                    <hr className="signuphr" />
                    <button type="button" class="loginbtn" onClick={() => { checkauth() }}> Log In </button>
                    <hr className="signuphr" />
                    <p className="forgotpasslink"><span className="forgotpasslink" onClick={forgotpass()}>Forgot Password</span>?</p>
                </form>
            </div>
            <div class="loginotp  col-md-5 col-lg-4">
                <form className="d-inline-block ">
                    <h1>Forgot Password</h1>
                    <p>Please fill registered email for recover your account.</p>
                    <hr className="signuphr" />
                    <label for="otpemail" className="otpemail"><b>Enter Registered Email</b></label>
                    <input type="email" value={email} onChange={(e) => { setvalue(e); }} placeholder="example@eg.com" name="otpemail" id="otpemail" required />
                    <label for="otplogin" className="otpemail"><b>Enter One Time Password</b></label>
                    <input type="text" value={otp} onChange={(e) => { setvalue(e); }} placeholder="6digit otp" name="otplogin" id="otplogin" required />
                    <hr className="signuphr" />
                    <button type="button" class="loginbtn" onClick={otppassword()}> Submit </button>
                </form>
            </div>
            <div class="loginpass  col-md-5 col-lg-4">
                <form className="d-inline-block ">
                    <h1>Recreate Password</h1>
                    <p>Please fill new password for login your account.</p>
                    <hr className="signuphr" />
                    <label for="newpassword" className="newpassword"><b>Enter New Password</b></label>
                    <input type="password" value={newpassword} onChange={(e) => { setvalue(e); }} placeholder="new password" name="newpassword" id="newpassword" required />
                    <label for="confirmpassword" className="confirmpassword"><b>Confirm Entered Password</b></label>
                    <input type="password" value={confirmpassword} onChange={(e) => { setvalue(e); }} placeholder="confirm password" name="confirmpassword" id="confirmpassword" required />
                    <hr className="signuphr" />
                    <button type="button" class="loginbtn" onClick={otplogin()}> Submit </button>
                </form>
            </div>
        </div>
    )
}
