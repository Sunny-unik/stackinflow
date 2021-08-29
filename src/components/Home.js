import "./css/home.css"
import React, { useEffect, useState } from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Followedtagsq from "./Followedtagsq"
import Allquestions from "./Allquestions"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

export default function Home(props) {

    // const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    // // useEffect(() => {
    // //     console.log("cjkdn")
    // //     if(user){
    //     const name = useSelector(state => state.user.name);
    //     const username = useSelector(state => state.user.dname);
    //     const email = useSelector(state => state.user.email);
    //     console.log(name+ "he")    
    // //     }
    // //     else{
    // //         console.log("else")
    // //     }
    // // }, [])

    return (
        <React.Fragment>
            {/* <Router> */}
            <div>
                <div class="container border border-dark home ">
                    {/* text-md-center and border not working */}
                    <div class="column content">
                        <div class="col-sm-2 sidenav ">
                            <p><NavLink activeClassName="active1" exact to="/">Home</NavLink></p>
                            {user && <p><NavLink activeClassName="active1" to="/questions">Questions</NavLink></p>}
                            <p><NavLink activeClassName="active1" to="/populartags">Popular Tags</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/popularusers">Popular Users</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/askaquestion">Ask a Question</NavLink></p>
                            {/* <p>{}</p> */}
                        </div>
                    <h5>{props.email}</h5>
                    </div>
                    <div className="col-sm-10">
                        <Switch>
                            <Route path="/questions" component={Followedtagsq} />
                            <Route path="/populartags" component={Populartags} />
                            <Route path="/popularusers" component={Popularusers} />
                            <Route path="/askaquestion" component={Askaquestion} />
                            <Route path="/" exact component={Allquestions} />
                        </Switch>
                    </div>
                </div>
            </div>
            {/* </Router> */}
        </React.Fragment>

    )
}





/* <footer class="forshow container-fluid text-center">
build too soon for pagination purpose
<p>Footer Text</p>
</footer> */