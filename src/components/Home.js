import "./css/home.css"
import React from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Followedtagsq from "./Followedtagsq"
import Allquestions from "./Allquestions"

export default function Home(props) {
    return (
        <React.Fragment>
            {/* <Router> */}

            <div>
                <div class="container border border-dark home ">
                    {/* text-md-center and border not working */}
                    <div class="column content">
                        <div class="col-sm-2 sidenav ">
                            <p><NavLink activeClassName="active1" exact to="/">Home</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/questions">Questions</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/populartags">Popular Tags</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/popularusers">Popular Users</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/askaquestion">Ask a Question</NavLink></p>
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