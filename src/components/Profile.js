import './css/profile.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Askedquestions from "./profile/Askedquestions"
import Givenanswer from "./profile/Givenaswer"
import Editprofile from "./profile/Editprofile"
import Likedanswer from './profile/Likedanswer'
import { useSelector} from 'react-redux';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { IoLocationSharp} from 'react-icons/io5';
import { FcCollaboration } from 'react-icons/fc';

export default function Profile(props) {
    
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
            const utitle = useSelector(state => state.user.title);
            const uabout = useSelector(state => state.user.about);
            const weblink = useSelector(state => state.user.weblink);
            const gitlink = useSelector(state => state.user.gitlink);
            const twitter = useSelector(state => state.user.twitter);
            const uaddress = useSelector(state => state.user.address);
            const uprofile = useSelector(state => state.user.profile);

        const [name, setname] = useState(uname)
        const [dname, setdname] = useState(udname)
        const [email, setemail] = useState(uemail)
        const [title, settitle] = useState(utitle)
        const [about, setabout] = useState(uabout)
        const [website, setwebsite] = useState(weblink)
        const [githublink, setgithublink] = useState(gitlink)
        const [twitterlink, settwitterlink] = useState(twitter)
        const [address, setaddress] = useState(uaddress)

    return (
        <React.Fragment>
            <div className="container ">
                <div className="col-md-3 col-lg-3 proimgdiv">
                    <div>
                        <img className="col-sm-12" src={ uprofile ? `http://localhost:3001/${uprofile}` : "assets/img/crea15.jpg"} alt="user profile" />
                    </div>
                </div>
                <div className="col-md-9 col-lg-8 col-sm-12 procontent">
                    <div className="udetails"><input type="text" value={name} required className="udetails"/><br/></div>
                    <div className="udetails"><input type="text" value={dname} required className="udetails"/><br/></div>
                    {/* <div className="udetails"><input type="email" value={email} required className="udetails"/><br/></div> */}
                    {title && <div className="udetails"><input type="text" value={title} required className="udetails"/><br/></div>}
                    {about && <div className="udetails"><input type="text" value={about} required className="udetails"/><br/></div>}
                    {address && <div className="udetails"><IoLocationSharp/><input type="text" value={address} required className="udetails"/><br/></div>}
                    {website && <a target="_blank" href={website}><FcCollaboration/></a>}&nbsp;&middot;&nbsp;
                    {githublink && <a target="_blank" href={githublink}><FaGithub/></a>}&nbsp;&middot;&nbsp;
                    {twitterlink && <a target="_blank" href={twitterlink}><FaTwitter/></a>}&nbsp;
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
