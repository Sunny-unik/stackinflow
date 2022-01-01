import "./css/home.css"
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Allquestions from "./Allquestions"
import Topquestions from "./Topquestions"
import { useDispatch, useSelector } from "react-redux"
import Question from "./question"
import React from "react"
import Footer from "./Footer"
import User from "./user"
import {  FaHome, FaQuestion, FaQuestionCircle, FaRegistered, FaSignInAlt, FaSignOutAlt, FaTags, FaUsers, FaUserTie, FaWindowClose } from "react-icons/fa"
import { FcMenu } from "react-icons/fc"
import { useEffect } from "react"
import Questionsbytags from "./questionsbytags"
import Editquestion from "./editquestion"
import About from "./About"
import Contact from "./Contact"
import Searchq from "./searchq"
import Askedquestionbyuser from "./Askedquestionbyuser"
import Givenaswerbyuser from "./Givenaswerbyuser"

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
<div>
    <button type="button" id='sidemenuopen' className="m-2 fixed-top btn-info rounded" onClick={openSlideMenu}><FcMenu/> </button>
    <button type="button" id='sidemenuclose' className="m-2 fixed-top btn-dark rounded" onClick={closeSlideMenu}><FaWindowClose/> </button>
    <div id="hiddennav" className="py-2 px-2">
        <NavLink activeClassName="active1" exact to="/" onClick={closeSlideMenu}><FaHome/> Home </NavLink><br /><br />
        <NavLink activeClassName="active1" to="/questions" onClick={closeSlideMenu}><FaQuestionCircle/>All Questions </NavLink><br /><br />
        <NavLink activeClassName="active1" to="/populartags" onClick={closeSlideMenu}><FaTags/>Popular Tags</NavLink><br /><br />
        <span activeClassName="active1" class="extralink" style={{fontSize:'inherit',fontFamily:'sans-serif'}} onClick={sidelink}>
            <FaQuestion/>Ask Question
        </span><br/><br/>
        <NavLink activeClassName="active1" to="/popularusers" onClick={closeSlideMenu}><FaUsers/> Popular Users </NavLink><br/><br/>
        {!user && <NavLink  activeClassName="active1" onClick={closeSlideMenu} to="/Login"><FaSignInAlt/>LogIn</NavLink>}
        {!user && <br/>}
        {!user && <br/>}
        {!user && <NavLink  activeClassName="active1" to="/Signup" onClick={closeSlideMenu}><FaRegistered/>SignUp</NavLink>}
        {user && <NavLink  activeClassName="active1" to="/Profile" onClick={closeSlideMenu}><FaUserTie/>Profile</NavLink>}<br /><br />
        {user && <span activeClassName="active1" style={{fontSize:'inherit',fontFamily:'sans-serif'}} class="extralink" onClick={logout}><FaSignOutAlt/>LogOut</span>}<br /><br />
    </div>
<div className="container-md" style={{ marginBottom:'0px'}}>
    <div className="row p-0">
        <div id="sidenavbar" class="col-sm-2 pt-3">
<NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'serif',fontSize:"1.4em",textShadow:"0.02em 0.02em black"}} exact to="/"> 
    Home
</NavLink><br /><br />
<NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'serif',fontSize:"1.4em",textShadow:"0.02em 0.02em black"}} to="/questions">
    All Question
</NavLink><br /><br />
<NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'serif',fontSize:"1.4em",textShadow:"0.02em 0.02em black"}} to="/populartags">
    Popular Tags
</NavLink><br /><br />
<NavLink activeClassName="active1" style={{fontSize:'larger',fontFamily:'serif',fontSize:"1.4em",textShadow:"0.02em 0.02em black"}} to="/popularusers">
    Popular Users
</NavLink><br /><br />
<h6 activeClassName="active1" class="extralink" style={{fontSize:'large',fontFamily:'serif',textShadow:"0.02em 0.02em black",fontSize:"1.4rem"}} onClick={sidelink}>
    Ask Question 
</h6><br /><br />
        </div>
        <div className="topmain col-sm-10 p-0">
            <Switch class="p-0">
            <Route path='/selfquestion/:id' component={Askedquestionbyuser} />
            <Route path='/selfanswer/:id' component={Givenaswerbyuser} />
                <Route path="/questions" component={Allquestions} />
                <Route path="/populartags" component={Populartags} />
                <Route path="/popularusers" component={Popularusers} />
                <Route path="/question/:id" component={Question} />
                <Route path="/editquestion/:qid" component={Editquestion} />
                <Route path="/user/:_id" component={User} />
                <Route path="/questionsby/:t" component={Questionsbytags} />
                <Route path="/askaquestion" component={Askaquestion} />
                <Route path="/" exact component={Topquestions} />
                <Route path="/about" component={About} />
                <Route path="/feedback" component={Contact} />
                <Route path="/search/:questionsearch" component={Searchq}/>
            </Switch>
        </div>
    </div>
</div>
<Footer />
</div>
    )
}