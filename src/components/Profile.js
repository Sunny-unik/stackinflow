import React from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Askedquestions from "./profile/Askedquestions"
import Givenanswer from "./profile/Givenaswer"
import Followedtags from "./profile/Followedtags"
import './css/profile.css'


export default function Profile(props) {
    
    return (
        <React.Fragment>
            <div className="container ">
                <div className="col-md-3 col-lg-4 col-sm-12">
                <div>img</div>
                {/* <input type="file" /> */}
                </div>
                <div className="col-md-9 col-lg-8 col-sm-12">
                {/* <div>{user?user.name:"user name"}</div> */}
                <div>dsbcjb</div>
                
                </div>
            </div>
            <div>
                <div class="container " id="profile">
                    <div class="column content">
                        <div class="col-sm-4 sidenav border-1">
                            <p><NavLink activeClassName="active1" to="/Profile/">Asked Questions</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/Profile/answer">Given Answers</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/Profile/followedtags">Followed Tags</NavLink></p>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <Switch>
                            <Route path="/Profile/answer" component={Givenanswer} />
                            <Route path="/Profilefollowedtags" component={Followedtags} />
                            <Route path="/Profile/" exact component={Askedquestions} />
                        </Switch>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
