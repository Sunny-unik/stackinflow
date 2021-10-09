import "./css/home.css"
import { Switch, Route, NavLink } from "react-router-dom"
import Populartags from "./Populartags"
import Popularusers from "./Popularusers"
import Askaquestion from "./Askaquestion"
import Allquestions from "./Allquestions"
import Topquestions from "./Topquestions"
import { useSelector } from "react-redux"
import Notification from "./Notification"

export default function Home(props) {

    const user = useSelector(state => state.user);
    
    return (
            <div className="home container-fluid">
                        <div class="col-md-2 col-lg-2 m-0 p-0 sidenavbar text-right">
                            <p><NavLink activeClassName="active1" exact to="/">Home</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/questions">Questions</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/populartags">Popular Tags</NavLink></p>
                            <p><NavLink activeClassName="active1" to="/popularusers">Popular Users</NavLink></p>
                            {user && <p><NavLink activeClassName="active1" to="/notification">Notifications</NavLink></p>}
                            {user && <p><NavLink activeClassName="active1" to="/askaquestion">Ask Question</NavLink></p>}
                        </div>
                    <div className="col-md-8 col-lg-9 m-0 p-0 topmain ">
                        <Switch>
                            <Route path="/questions" component={Allquestions} />
                            <Route path="/populartags" component={Populartags} />
                            <Route path="/popularusers" component={Popularusers} />
                            <Route path="/notification" component={Notification} />
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