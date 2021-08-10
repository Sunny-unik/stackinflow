import React from 'react'
import "./css/login.css"

export default function Login(props) {
    function checkauth() {
        console.log("your fun working ")
        props.history.push('/')
    }
    return (
        <div>
            <form>
                <div class="container d-flex py-2 justify-content-center">
                    {/* displayflex and contentcenter not working now and signup.css also need some time */}
                    <div class="row">
                        <div className="col-sm-10 col-md-6 " >
                            <h1>Log In</h1>
                            <p>Please fill log in details for login your account.</p>
                            <hr className="loginhr" />
                            <label for="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="email" id="email" required />
                            <label for="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
                            <hr className="loginhr" />
                            <button type="submit" onClick={()=>{checkauth()}} class="registerbtn">Log In</button>
                            <div class="container forgotpassword">
                                <p><span href="#">Forgot Password</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
