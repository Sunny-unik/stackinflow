import './css/profile.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Askedquestions from "./profile/Askedquestions"
import Givenanswer from "./profile/Givenaswer"
import Editprofile from "./profile/Editprofile"
import Likedanswer from './profile/Likedanswer'
import {useDispatch, useSelector} from 'react-redux';

export default function Profile(props) {
    
    //   const dispatch = useDispatch();
    const user = useSelector(state => state.user);
        useEffect(() => {
            if(user==null){
                alert("User need to login first")
                props.history.push('/Login')
            }
        })
        console.log(user)
        
            const uname = useSelector(state => state.user.name);
            const udname = useSelector(state => state.user.dname);
            const uemail = useSelector(state => state.user.email);

        const [name, setname] = useState(uname)
        const [dname, setdname] = useState(udname)
        const [email, setemail] = useState(uemail)

    return (
        <React.Fragment>
            <div className="container ">
                <div className="col-md-3 col-lg-4 col-sm-12 proimgdiv">
                    <div className="img">img</div>
                    {/* <input type="file" /> */}
                </div>
                <div className="col-md-9 col-lg-8 col-sm-12 procontent">
                    <input type="text" value={name} required className="udetails"/><br/>
                    <input type="text" value={dname} required className="udetails"/><br/>
                    <input type="email" value={email} required className="udetails"/><br/>
                </div>
            </div>
            <div>
                <div class="container " id="profile">
                    <div class="column content">
                        <div class="col-sm-4 sidenav border-1">
                            <p><NavLink activeClassName="active" to="/Profile">Liked Answers</NavLink></p>
                            <p><NavLink activeClassName="active" to="/Profile/editprofile">Edit Profile</NavLink></p>
                            <p><NavLink activeClassName="active" to="/Profile/selfquestion">Asked Questions</NavLink></p>
                            <p><NavLink activeClassName="active" to="/Profile/selfanswer">Given Answers</NavLink></p>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <Switch>
                            <Route path="/Profile" exact component={Likedanswer} />
                            <Route path="/Profile/editprofile" component={Editprofile} />
                            <Route path="/Profile/selfquestion" component={Askedquestions} />
                            <Route path="/Profile/selfanswer" component={Givenanswer} />
                        </Switch>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
