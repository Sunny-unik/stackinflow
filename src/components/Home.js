import "./css/home.css"
import React, { useEffect, useState } from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Allquestions from "./Allquestions"
import Topquestions from "./Topquestions"
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
            <div className="home container-fluid">
                        <div class="col-md-2 col-lg-2 m-0 p-0 sidenavbar text-right">
                            <p><NavLink activeClassName="active1" exact to="/">Home</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/questions">Questions</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/populartags">Popular Tags</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/popularusers">Popular Users</NavLink></p>
                            {user && <p><NavLink activeClassName="active1" to="/askaquestion">Ask a Question</NavLink></p>}
                        </div>
                    <div className="col-md-8 col-lg-9 m-0 p-0 topmain ">
                        <Switch>
                            <Route path="/questions" component={Allquestions} />
                            <Route path="/populartags" component={Populartags} />
                            <Route path="/popularusers" component={Popularusers} />
                            <Route path="/askaquestion" component={Askaquestion} />
                            <Route path="/" exact component={Topquestions} />
                        </Switch>
                    </div>
            </div>
    )
}





/* <footer class="forshow container-fluid text-center">
build too soon for pagination purpose
<p>Footer Text</p>
</footer> */