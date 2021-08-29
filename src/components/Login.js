import "./css/login.css"
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { checkLogin } from '../action/useraction';
import {useDispatch, useSelector} from 'react-redux';

export default function Login(props) {

    const [otp, setotp] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [randomotp, setrandomotp] = useState("")

    function setvalue(e) {
        e.target.name === "otplogin" && setotp(e.target.value)
        e.target.name === "email" && setemail(e.target.value)
        e.target.name === "password" && setpassword(e.target.value)
        e.target.name === "newpassword" && setnewpassword(e.target.value)
        e.target.name === "confirmpassword" && setconfirmpassword(e.target.value)
    }

    const reduxUser = useSelector(state => state.user);

    useEffect(() => {
      if(reduxUser){
        props.history.push("/");
      }
      else{
          props.history.push("/Login")
      }
    }, [reduxUser]);
  
    const dispatch = useDispatch();
    
    function checkauth() {
        dispatch(checkLogin({email,password}));
    }
    
    function forgotpass(){
        console.log(email)
        if(email==''){
            alert("first enter your email or username")
        }
        else{
            var random = Math.floor((Math.random() * 1000000) + 1);
            setrandomotp(random);
            axios.post("http://localhost:3001/send-otp-email", { email, otp: random }).then((res) => {
                if (res.data.status == "ok") {
                    alert("otp sent to your email");
                    var forgotpass = document.getElementById('logindetail');
                    forgotpass.style.display = "none";
                    var forgotpass2 = document.getElementById('loginotp');
                    forgotpass2.style.display = "block";
                }
                else {
                    alert("this email or username are not registered");
                }
            })
        }
    }
    function otppassword() {
        console.log("checking otp")
        var s = { otp }
        console.log(s);
        if (otp == randomotp) {
            
            alert("you have to create new password")
            var logotp = document.getElementById('loginotp');
            logotp.style.display = "none";
            var logotp2 = document.getElementById('loginpass');
            logotp2.style.display = "block"
        }
        else {
            alert("! incorrect otp ");
        }
    }
    function otplogin() {
        if(newpassword===confirmpassword){
            axios.post("http://localhost:3001/update-password",{email,newpassword}).then((res)=>{
                alert(res.data.data)
            })
            let changepass = document.getElementById('loginpass');
            changepass.style.display = "none";
            let login = document.getElementById('logindetail');
            login.style.display = "block"
            props.history.push("/Login");
        }
        else{
            alert("password should be same in both textbox")
        }
    }
    
    return (
        <div className="container logincon column">
            <div className="col-md-5 col-lg-4 " id="logindetail" >
                <form className="d-inline-block ">
                    <h1>Log In</h1>
                    <p>Please fill log in details for login your account.</p>
                    <hr className="signuphr" />
                    <label for="email"><b>Registered Email Or Username</b></label>
                    <input type="text" value={email} onChange={(e) => { setvalue(e); }} placeholder="example@eg.com" name="email" id="email" required />
                    <label for="password"><b>Your   Password</b></label>
                    <input type="password" value={password} onChange={(e) => { setvalue(e); }} placeholder="password" name="password" id="password" required />
                    <hr className="signuphr" />
                    <button type="button" class="loginbtn" onClick={() => { checkauth() }}> Log In </button>
                    <hr className="signuphr" />
                    <p className="forgotpasslink"><span className="forgotpasslink" onClick={forgotpass}>Forgot Password</span>?</p>
                </form>
            </div>
            <div class="col-md-5 col-lg-4" id="loginotp">
                <form className="d-inline-block ">
                    <h1>Forgot Password</h1>
                    <p>Please fill registered email for recover your account.</p>
                    <hr className="signuphr" />
                    <label for="otplogin" className="otpemail"><b>Enter One Time Password</b></label>
                    <input type="number" value={otp} onChange={(e) => { setvalue(e); }} placeholder="6 digit otp" name="otplogin" id="otplogin" required />
                    <hr className="signuphr" />
                    <button type="button" class="loginbtn" onClick={otppassword}> Submit </button>
                </form>
            </div>
            <div class="col-md-5 col-lg-4" id="loginpass">
                <form className="d-inline-block ">
                    <h1>Recreate Password</h1>
                    <p>Please fill new password for login your account.</p>
                    <hr className="signuphr" />
                    <label for="newpassword" className="newpassword"><b>Enter New Password</b></label>
                    <input type="password" value={newpassword} onChange={(e) => { setvalue(e); }} placeholder="new password" name="newpassword" id="newpassword" required />
                    <label for="confirmpassword" className="confirmpassword"><b>Confirm Entered Password</b></label>
                    <input type="password" value={confirmpassword} onChange={(e) => { setvalue(e); }} placeholder="confirm password" name="confirmpassword" id="confirmpassword" required />
                    <hr className="signuphr" />
                    <button type="button" class="loginbtn" onClick={otplogin}> Submit </button>
                </form>
            </div>
        </div>
    )
}
