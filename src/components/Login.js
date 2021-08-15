import "./css/login.css"
import axios from 'axios'
import React, { useState,useEffect } from 'react'

export default function Login(props) {

    const [email, setemail] = useState("")
    const [otp, setotp] = useState("")
    const [password, setpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const [user,setUser] = useState([])

    function setvalue(e) {
        e.target.name === "email" && setemail(e.target.value)
        e.target.name === "otp" && setotp(e.target.value)
        e.target.name === "password" && setpassword(e.target.value)
        e.target.name === "newpassword" && setnewpassword(e.target.value)
        e.target.name === "confirmpassword" && setconfirmpassword(e.target.value)
    }

    useEffect(()=>{
     axios.get('http://localhost:3001/list-user').then((res)=>{
         console.log(res.data.data)
         setUser(res.data.data)
     })   
    },[])

    function checkauth() {
        var check=user.some((s)=>{
            return s.email===email && s.password ===password
        })
        console.log(check); 
        if(check===true){
            alert("you have successfully login")
            console.log(user)
            props.history.push("/");            
        }
        else{
            alert("!incorrect email or password, please check email and password")
        }
    }
    
    function forgotpass(){
        console.log("forgot password attempted")
        var forgotpass = document.getElementById('logindetail');
        forgotpass.style.display = "none";
        var forgotpass2 = document.getElementById('loginotp');
        forgotpass2.style.display = "block";
    }
    
    function otppassword() {
        var check=user.some((s)=>{
            alert(s)
            return s.email===email && s.otp===otp
        })
        console.log(check); 
        if(check===true){
            alert("you have successfully login")
            console.log(user)
            var logotp = document.getElementById('loginotp');
            logotp.style.display = "none";
            var logotp2 = document.getElementById('loginpass');
            logotp2.style.display = "block";
        }
        else{
            alert("! incorrect otp")
        }            
    }

    function otplogin(props) {
        console.log("your password working ")
        if(newpassword===confirmpassword){
            props.history.push('/')
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
                    <label for="email"><b>Registered Email</b></label>
                    <input type="email" value={email} onChange={(e) => { setvalue(e); }} placeholder="example@eg.com" name="email" id="email" required />
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
                    <label for="otpemail" className="otpemail"><b>Enter Registered Email</b></label>
                    <input type="email" value={email} onChange={(e) => { setvalue(e); }} placeholder="example@eg.com" name="otpemail" id="otpemail" required />
                    <label for="otplogin" className="otpemail"><b>Enter One Time Password</b></label>
                    <input type="text" value={otp} onChange={(e) => { setvalue(e); }} placeholder="6digit otp" name="otplogin" id="otplogin" required />
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
