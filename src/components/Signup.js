import React from 'react'
import './css/signup.css'

export default function Signup() {
    return (
        <div>
            <form action="action_page.php">
                <div class="container d-flex py-2 justify-content-center">
                {/* displayflex and contentcenter not working now and signup.css also need some time */}
                    <div class="row ">
                        <div className="col-sm-10 col-md-6 " >
                            <h1>Create an account</h1>
                            <p>Please fill this form and get verified for register.</p>
                            <hr />
                            
                            <label for="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="email" id="email" required />

                            <label for="dname"><b>Display Name</b></label>
                            <input type="text" placeholder="Enter Display Name" name="dname" id="dname" required />
                            
                            <label for="tags"><b>Favourite Tags</b></label>
                            <input type="text" placeholder="Enter Tags You Like" name="tags" id="tags" required />
                            
                            <label for="password"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" id="password" required />
                            
                            <button type="submit" class="registerbtn">Get Verfiy</button>

                            <hr />
                            <label for="otp" className="inputotp"><b>Otp sent on gievn mail-address</b></label>
                            <input type="text" placeholder="Enter Verfication Code" name="otp" id="otp" required />
                            <button type="submit" class="registerbtn">Sign Up</button>
                        
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
