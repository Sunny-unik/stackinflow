import React, { useState} from 'react'
import './css/signup.css'

export default function Signup() {
    
    const [email, setemail] = useState("")
    const [dname, setdname] = useState("")
    const [password, setpassword] = useState("")

    function setvalue(e){
        e.target.name==="cemail" && setemail(e.target.value)
        e.target.name==="cdname" && setdname(e.target.value)
        e.target.name==="cpassword" && setpassword(e.target.value)
    }

    function create(){
        // var s = {
        //     email,dname,password
        // }
        // axios.post('http://localhost:3000/update-student',s).then((res)=>{
        //     console.log(res.data);
        //     })
        //     alert("Student Updated Successfully");
        //     }
    }
    return (
        <div>
                <div class="container d-flex py-2 justify-content-center">
                {/* displayflex and contentcenter not working now and signup.css also need some time */}
                    <div class="row ">
            <form >
                        <div className="col-sm-10 col-md-6 " >
                            <h1>Create an account</h1>
                            <p>Please fill this form and get verified for register.</p>
                            <hr className="signuphr" />
                        <div className="form-group">
                            <label for="createemail"><b>Email</b></label>
                            <input type="email" value={email} onChange={(e)=>{setvalue(e);}} placeholder="Enter Email" name="cemail" id="createemail" required />
                        </div>
                        <div className="form-group">
                            <label for="createdname"><b>Display Name</b></label>
                            <input type="text" value={dname} onChange={(e)=>{setvalue(e);}}  placeholder="Enter Display Name" name="cdname" id="createdname" required />
                        </div>
                        <div className="form-group">
                            <label for="createpassword"><b>Password</b></label>
                            <input type="password" value={password} onChange={(e)=>{setvalue(e);}}  placeholder="Enter Password" name="cpassword" id="createpassword" required />
                        </div>
                            <button type="submit" class="btn btn-primary registerbtn" onClick={create()}>Get Verfiy</button>

                            <hr className="signuphr" />
                            {/* <label for="otp" className="inputotp"><b>Otp sent on gievn email-address</b></label>
                            <input type="text" placeholder="Enter Verfication Code" name="otp" id="otp" required />
                            <button type="submit" class="registerbtn" onClick={otpcheck}>Sign Up</button> */}
                            
                        </div>
            </form>
                    </div>
                </div>
        </div>
    )
}
