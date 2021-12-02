import "./css/home.css"
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Allquestions from "./Allquestions"
import Topquestions from "./Topquestions"
import { useDispatch, useSelector } from "react-redux"
import Notification from "./Notification"
import Question from "./question"
import Tag from "./tag"
import React from "react"
import Footer from "./Footer"
import User from "./user"
import {  FaHome, FaQuestion, FaQuestionCircle, FaRegistered, FaSignInAlt, FaSignOutAlt, FaTags, FaUsers, FaUserTie, FaWindowClose } from "react-icons/fa"
import { FcMenu } from "react-icons/fc"
import { IoNotificationsCircleOutline } from "react-icons/io5"
import { useEffect } from "react"
import Questionsbytags from "./questionsbytags"

export default function Home(props) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    function logout(){
        dispatch({type:"LOGOUT_USER"});
        alert("User successfully logout")
    }

    useEffect(() => {
        closeSlideMenu();
    }, [])

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
    <button type="button" id='sidemenuopen' className="m-2 fixed-top btn-dark" onClick={openSlideMenu}><FcMenu/> </button>
    <button type="button" id='sidemenuclose' className="m-2 fixed-top btn-primary" onClick={closeSlideMenu}><FaWindowClose/> </button>
    <div id="hiddennav" className="py-2 px-2">
        <NavLink activeClassName="active1" exact to="/" onClick={closeSlideMenu}><FaHome/> Home </NavLink><br /><br />
        <NavLink activeClassName="active1" to="/questions" onClick={closeSlideMenu}><FaQuestionCircle/> Questions </NavLink><br /><br />
        <NavLink activeClassName="active1" to="/populartags" onClick={closeSlideMenu}><FaTags/> Popular Tags </NavLink><br /><br />
        <span activeClassName="active1" class="extralink" style={{fontSize:'inherit',fontFamily:'sans-serif'}} onClick={sidelink}><FaQuestion/> Ask Question </span><br/><br/>
        <NavLink activeClassName="active1" to="/popularusers" onClick={closeSlideMenu}><FaUsers/> Popular Users </NavLink><br/><br/>
        {!user && <NavLink  activeClassName="active1" onClick={closeSlideMenu} to="/Login"><FaSignInAlt/>LogIn</NavLink>}
        {!user && <br/>}
        {!user && <br/>}
        {!user && <NavLink  activeClassName="active1" to="/Signup" onClick={closeSlideMenu}><FaRegistered/>SignIn</NavLink>}
        {user && <NavLink  activeClassName="active1" to="/Profile" onClick={closeSlideMenu}><FaUserTie/>Profile</NavLink>}<br /><br />
        {user && <NavLink activeClassName="active1" to="/notification" onClick={closeSlideMenu}><IoNotificationsCircleOutline/> Notifications </NavLink>}<br /><br />
        {user && <span activeClassName="active1" style={{fontSize:'inherit',fontFamily:'sans-serif'}} class="extralink" onClick={logout}><FaSignOutAlt/>LogOut</span>}<br /><br />
    </div>
<div className="container-md" style={{ marginBottom:'0px'}}>
    <div className="row p-0">
        <div id="sidenavbar" class="col-sm-2 pt-3">
        <NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'sans-serif'}} exact to="/">Home </NavLink><br /><br />
        <NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'sans-serif'}} to="/questions">Questions </NavLink><br /><br />
        <NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'sans-serif'}} to="/populartags">Popular Tags </NavLink><br /><br />
        <NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'sans-serif'}} to="/popularusers">Popular Users </NavLink><br /><br />
        <h6 activeClassName="active1" class="extralink" style={{fontSize:'large',fontFamily:'sans-serif'}} onClick={sidelink} >Ask Question </h6><br />
        {user && <NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'sans-serif'}} to="/notification">Notifications </NavLink>}<br /><br />
        </div>
        <div className="topmain col-sm-10 p-0 ml-sm-2">
            <Switch class="p-0">
                <Route path="/questions" class="p-0" component={Allquestions} />
                <Route path="/populartags" component={Populartags} />
                <Route path="/popularusers" component={Popularusers} />
                <Route path="/question/:id" component={Question} />
                <Route path="/user/:userdname" component={User} />
                <Route path="/tag/:tag" component={Tag} />
                <Route path="/notification" component={Notification} />
                <Route path="/questionsby/:t" component={Questionsbytags} />
                <Route path="/askaquestion" component={Askaquestion} />
                <Route path="/" exact component={Topquestions} />
            </Switch>
        </div>
    </div>
</div>
<Footer />
</React.Fragment>
    )
}