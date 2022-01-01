import './css/profile.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Askedquestions from "./profile/Askedquestions"
import Givenanswer from "./profile/Givenaswer"
import Editprofile from "./profile/Editprofile"
import Likedanswer from './profile/Likedanswer'
import { useDispatch, useSelector } from 'react-redux';
import { FaGithub, FaHome, FaQuestion, FaQuestionCircle, FaSignOutAlt, FaTags, FaTwitter, FaUsers, FaUserTie, FaWindowClose } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { FcCollaboration, FcMenu } from 'react-icons/fc';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Footer from './Footer'

export default function Profile(props) {

    const user = useSelector(state => state.user);
    useEffect(() => {
        closeSlideMenu();
        if (user == null) {
            alert("User need to login first")
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
    const [questionu, setdbquestionu] = useState(0)
    const [answeru, setanswerbyudnu] = useState(0)
    const [likesu, setlikesbyudnu] = useState(0)

    
    function openSlideMenu() {
        document.getElementById('sidemenuopen').style.display = 'none';
        document.getElementById('sidemenuclose').style.display = 'block';
        document.getElementById('hiddennav').style.display = 'block';
    }
    function closeSlideMenu() {
        document.getElementById('sidemenuclose').style.display = 'none';
        document.getElementById('sidemenuopen').style.display = 'block';
        document.getElementById('hiddennav').style.display = 'none';
    }
    
    const dispatch = useDispatch();
    function logout(){
        dispatch({type:"LOGOUT_USER"});
        alert("User successfully logout")
    }

    function sidelink(){
        if(user){
            props.history.push("/askaquestion")
            closeSlideMenu()
        }
        else{
            alert('User need to login first')
        }
    }

    return (
        <React.Fragment>

    <button type="button" id='sidemenuopen' className="m-1 fixed-top btn-info rounded" onClick={openSlideMenu}><FcMenu/></button>
    <button type="button" id='sidemenuclose' className="m-1 fixed-top btn-dark rounded" onClick={closeSlideMenu}><FaWindowClose/></button>
    <div id="hiddennav" className="py-2 px-2">
        <NavLink activeClassName="active1" exact to="/" onClick={closeSlideMenu}><FaHome/> Home </NavLink><br /><br />
        <NavLink activeClassName="active1" to="/questions" onClick={closeSlideMenu}><FaQuestionCircle/> Questions </NavLink><br /><br />
        <NavLink activeClassName="active1" to="/populartags" onClick={closeSlideMenu}><FaTags/> Popular Tags </NavLink><br /><br />
        <span activeClassName="active1" class="extralink" style={{fontSize:'inherit',fontFamily:'sans-serif'}} onClick={sidelink}><FaQuestion/> Ask Question </span><br/><br/>
        <NavLink activeClassName="active1" to="/popularusers" onClick={closeSlideMenu}><FaUsers/> Popular Users </NavLink><br /><br />
        <NavLink  activeClassName="active1" to="/Profile" onClick={closeSlideMenu}><FaUserTie/> Profile </NavLink><br /><br />
        <NavLink  activeClassName="active1" onClick={logout} to="/Login" onClick={closeSlideMenu}><FaSignOutAlt/> LogOut </NavLink><br /><br />
    </div>

            <div className="container">
               <div className='d-md-flex'>
                <div className="col-md-5 col-sm-10 col-lg-4 mx-auto proimgdiv"><br />
                    <div className="profilepic col-sm-8" data-aos="flip-up" data-aos-once='true' data-aos-duration="600" >
                        <img className="col-sm-12" height="225rem" width="75rem" src={uprofile ? `http://localhost:3001/${uprofile}` : "assets/img/crea15.jpg"} alt="user profile" />
                    </div>
                </div>
                <div data-aos="fade-left" data-aos-duration="600" className="px-md-4 col-md-8 col-lg-7 col-sm-12 procontent"><br />
                    <div className='text-center'>
                    <label style={{fontFamily:"SeogUI"}} >User's Name</label><div><h2 className="my-0" style={{fontFamily:"Sans-Serif",fontWeight:"bold"}}>{name}</h2></div>
                    <label style={{fontFamily:"SeogUI"}}>Display Name</label><div><h3 style={{fontFamily:"Sans-Serif",fontWeight:"bold"}}>{dname}</h3></div>
                    {title && <div><label style={{fontFamily:"SeogUI"}}>Work Title</label><h3>{title}</h3></div>}
                    <label style={{fontFamily:"SeogUI"}}>User Email</label><h3 style={{fontFamily:"Sans-Serif",fontWeight:"bold"}}>{email}</h3> 
                    {address && <div><label style={{fontFamily:"SeogUI"}}>Address</label>
                        <h4 style={{fontFamily:"Sans-Serif"}}><IoLocationSharp />&nbsp;{address}</h4> </div>}
                    <h4>{website && <a target="_blank" href={website}><abbr title={website}><FcCollaboration /></abbr></a>}&nbsp;&middot;&nbsp;
                        {githublink && <a target="_blank" href={githublink}><abbr title={githublink}><FaGithub /></abbr></a>}&nbsp;&middot;&nbsp;
                        {twitterlink && <a target="_blank" href={twitterlink}><abbr title={twitterlink}><FaTwitter /></abbr></a>}&nbsp;</h4>
                    <h4 style={{ fontFamily: 'SeogUI', fontWeight:"bold" }}>Total Points : {user.userlikes==null?0:user.userlikes} </h4><br />
                    </div>
                </div>
               </div>
                <div className="col-sm-12">
                    {about && <div><label><h1>About </h1></label>
                    <h3>{about}</h3> </div>}
                </div>
            </div><br />
            <div>
                <div class="row ">
                    <div class="d-flex flex-xs-column flex-md-row justify-content-center content py-2 bg-dark rounded">
                        <div data-aos="zoom-out" data-aos-once='true' data-aos-duration="600" class="d-flex flex-sm-column flex-md-row text-center">
                            <p className='mx-1 my-auto px-1'><NavLink class="btn text-primary rounded p-1" activeClassName="active" to="/Profile" style={{ fontSize: 'large' }}>
                                Liked Answers
                            </NavLink></p>
                            <p className='mx-1 my-auto px-1'><NavLink class="btn text-primary rounded p-1" activeClassName="active" to="/Profile/editprofile" style={{ fontSize: 'large' }}>
                                Edit Profile
                            </NavLink></p>
                            <p className='mx-1 my-auto px-1'><NavLink class="btn text-primary rounded p-1" activeClassName="active" to="/Profile/selfquestion" style={{ fontSize: 'large' }}>
                                Asked Questions
                            </NavLink></p>
                            <p className='mx-1 my-auto px-1'><NavLink class="btn text-primary rounded p-1" activeClassName="active" to="/Profile/selfanswer" style={{ fontSize: 'large' }}>
                                Given Answers
                            </NavLink></p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div className="col-sm-10">
                        <Switch>
                            <Route path="/Profile" exact component={Likedanswer} />
                            <Route path="/Profile/editprofile" component={Editprofile} />
                            <Route path="/Profile/selfquestion" component={Askedquestions} />
                            <Route path="/Profile/selfanswer" component={Givenanswer} />
                        </Switch>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
AOS.init();