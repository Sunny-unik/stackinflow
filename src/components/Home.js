import "./css/home.css"
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Allquestions from "./Allquestions"
import Topquestions from "./Topquestions"
import { useSelector } from "react-redux"
import Notification from "./Notification"
import Question from "./question"
import Tag from "./tag"
import React from "react"
import Footer from "./Footer"
import User from "./user"

export default function Home(props) {

    const user = useSelector(state => state.user);
    
    return ( <React.Fragment>
            <div className="home container-fluid" style={{marginBottom:'0px'}}>
                        <div class="col-md-2 col-lg-2 m-0 p-0 sidenavbar text-right">
                        <br/><NavLink style={{color:'blue',fontFamily:'sans-serif'}} activeClassName="active1" className="ok" exact to="/">Home </NavLink><br/><br/>
                            <NavLink style={{color:'blue',fontFamily:'sans-serif'}} activeClassName="active1" className="ok" to="/questions"> Questions </NavLink><br/><br/>
                            <NavLink style={{color:'blue',fontFamily:'sans-serif'}} activeClassName="active1" className="ok" to="/populartags"> Popular Tags </NavLink><br/><br/>
                            <NavLink style={{color:'blue',fontFamily:'sans-serif'}} activeClassName="active1" className="ok" to="/popularusers"> Popular Users </NavLink><br/><br/>
                            {/* {user && <NavLink style={{color:'blue'}} activeClassName="active1" className="ok" to="/notification"> Notifications </NavLink>}<br/><br/> */}
                            {user && <NavLink style={{color:'blue'}} activeClassName="active1" className="ok" to="/askaquestion"> Ask Question </NavLink>}<br/>
                        </div>
                    <div className="col-md-8 col-lg-9 m-0 p-0 topmain ">
                        <Switch>
                            <Route path="/questions" component={Allquestions} />
                            <Route path="/populartags" component={Populartags} />
                            <Route path="/popularusers" component={Popularusers} />
                            <Route path="/question/:id" component={Question} />
                            <Route path="/user/:userdname" component={User} />
                            <Route path="/tag/:tag" component={Tag} />
                            <Route path="/notification" component={Notification} />
                            <Route path="/askaquestion" component={Askaquestion} />
                            <Route path="/" exact component={Topquestions} />
                        </Switch>
                    </div>
            </div>
            <Footer/>
            </React.Fragment>
    )
}




/* <footer class="forshow container-fluid text-center">
build too soon for pagination purpose
<p>Footer Text</p>
</footer> */