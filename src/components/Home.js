import "./css/home.css"
import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Followedtags from "./Followedtags"
import Allquestions from "./Allquestions"

export default function Home() {
    return (
        <Router>
            <div>
                <div class="container text-md-center home">
                    {/* text-md-center not working */}
                    <div class="column content">
                        <div class="col-sm-2 sidenav ">
                            <p><NavLink activeClassName="act" to="/">Home</NavLink></p>
                            <p><NavLink activeClassName="act" to="/questions">Questions</NavLink></p>
                            <p><NavLink activeClassName="act" to="/populartags">Popular Tags</NavLink></p>
                            <p><NavLink activeClassName="act" to="/popularusers">Popular Users</NavLink></p>
                            <p><NavLink activeClassName="act" to="/askaquestion">Ask a Question</NavLink></p>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <Switch>
                            <Route path="/" exact component={Allquestions} />
                            <Route path="/questions" component={Followedtags} />
                            <Route path="/populartags" component={Populartags} />
                            <Route path="/popularusers" component={Popularusers} />
                            <Route path="/askaquestion" component={Askaquestion} />
                        </Switch>

{/* <footer class="forshow container-fluid text-center">
build too soon for pagination purpose
  <p>Footer Text</p>
</footer> */}
                    </div>
                </div>
            </div>
        </Router>
    )
}
