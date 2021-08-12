import React, { useState } from 'react'
import './css/signup.css'
import axios from 'axios'

export default function Signup(props) {

    // function hide(){
    //     var Signup = document.getElementsByClassName('createdetail');
    //     Signup.style.display = "none";
    //     var Signup = document.getElementsByClassName('createotp');
    //     Signup.style.display = "block";
    // }
    
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [dname, setdname] = useState("")
    const [password, setpassword] = useState("")

    function setvalue(e) {
        e.target.name === "cemail" && setemail(e.target.value)
        e.target.name === "cname" && setname(e.target.value)
        e.target.name === "cdname" && setdname(e.target.value)
        e.target.name === "cpassword" && setpassword(e.target.value)
    }

    console.log(email)

    function create(){
        var isvalid=true;
    
        //validate for email
        // var email = document.getElementsByName('Uemail').value;
// eslint-disable-next-line
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailregex.test(email)){
          alert("Email is not valid");
          isvalid=false;
        }

// eslint-disable-next-line
        //validate for password
        // var password = document.getElementsByName('Upassword').value;
// eslint-disable-next-line
        var passregex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/ ;
        if(!passregex.test(password)){
            alert("Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long");
// eslint-disable-next-line
            isvalid=false;
        }

// eslint-disable-next-line
        if(isvalid==true){
            // alert("valid")
        var s = {email,name,dname,password }
        console.log(s);
        axios.post('http://localhost:3000/create-user',s).then((res)=>{
            
            alert(res.data.data);
            props.history.push("/");
        }) 
        }
        }


    // function otpcheck() {
    //     console.log("checking otp")
    //     // create()
    // }

    return (
        <div className="container signupcon column">
            <div className="col-md-5 col-lg-4 createdetail" >
                <form className="d-inline-block ">
                    <h1>Create an account</h1>
                    <p>Please fill this form and get verified for register.</p>
                    <hr className="signuphr" />
                    <label for="createemail"><b>Email</b></label>
                    <input type="email" value={email} onChange={(e)=>{setvalue(e);}} minlength="5" placeholder="example@eg.co" name="cemail" id="createemail" required />
                    <label for="createname"><b>Your Name</b></label>
                    <input type="text" value={name} onChange={(e)=>{setvalue(e);}} minlength="2" maxlength="25"  placeholder="name lastname" name="cname" id="createname" required />
                    <label for="createdname"><b>Display Name</b></label>
                    <input type="text" value={dname} onChange={(e)=>{setvalue(e);}} minlength="2" maxLength="12" placeholder="display_name" name="cdname" id="createdname" required />
                    <label for="createpassword"><b>Password</b></label>
                    <input type="password" value={password} onChange={(e)=>{setvalue(e);}} minlength="8" maxLength="16" placeholder="password should be strong" name="cpassword" id="createpassword" required />
                    <hr className="signuphr" />
                    <button type="button" class="registerbtn" onClick={()=>{create()}}> Sign Up </button>
                </form>
            </div>
            {/* <div class="createotp  col-md-5 col-lg-4">
                <form className="d-inline-block ">
                    <h1>Confirm Email</h1>
                    <p>Please fill 6alphanumeric code for create your account.</p>
                    <hr className="signuphr" />
                    <label for="otp" className="inputotp"><b>Otp sent on gievn email-address</b></label>
                    <input type="text" placeholder="Enter Verfication Code" name="otp" id="otp" required />
                    <hr className="signuphr" />
                    <button type="button" class="registerbtn" onClick={otpcheck()}> Submit </button>
                </form>
            </div> */}
        </div>
    )
}
