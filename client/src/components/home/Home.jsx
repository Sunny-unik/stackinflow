import { useSelector } from "react-redux";
import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Populartags from "../PopularTags";
import Popularusers from "../PopularUsers";
import AskQuestion from "../AskQuestion";
import Allquestions from "../AllQuestions";
import Topquestions from "../filterQuestion/TopQuestions";
import Question from "../openQuestion/OpenedQuestion";
import Footer from "../Footer";
import User from "../User";
import QuestionsByTag from "../QuestionsByTag";
import EditQuestion from "../EditQuestion";
import About from "../About";
import Feedback from "../Feedback";
import Searchq from "../searchQuestion/SearchQuestion";

export default function Home(props) {
  const user = useSelector((state) => state.user);

  const sidelink = () => {
    user
      ? props.history.push("/askquestion")
      : alert("You need to login first");
  };

  return (
    <>
      <div className="container-lg">
        <div className="row">
          <ul id="sideLeftNav" className="col-sm-2 p-0">
            <li className="nav-link pe-0">
              <NavLink
                style={{
                  fontFamily: "serif",
                  fontSize: "1.4em",
                  textShadow: "0.02em 0.02em black"
                }}
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-link pe-0">
              <NavLink
                style={{
                  fontFamily: "serif",
                  fontSize: "1.4em",
                  textShadow: "0.02em 0.02em black"
                }}
                to="/questions"
              >
                All Question
              </NavLink>
            </li>
            <li className="nav-link pe-0">
              <NavLink
                style={{
                  fontFamily: "serif",
                  fontSize: "1.4em",
                  textShadow: "0.02em 0.02em black"
                }}
                to="/popularTags"
              >
                Popular Tags
              </NavLink>
            </li>
            <li className="nav-link pe-0">
              <NavLink
                style={{
                  fontFamily: "serif",
                  fontSize: "1.4em",
                  textShadow: "0.02em 0.02em black"
                }}
                to="/popularUsers"
              >
                Popular Users
              </NavLink>
            </li>
            <li className="nav-link pe-0">
              <span
                className="extraLink"
                style={{
                  fontFamily: "serif",
                  textShadow: "0.02em 0.02em black",
                  fontSize: "1.4rem"
                }}
                onClick={sidelink}
              >
                Ask Question
              </span>
            </li>
          </ul>
          <div
            className="col-sm-10 p-0 overflow-hidden border border-primary"
            id="mainSection"
          >
            <Switch>
              <Route path="/questions" component={Allquestions} />
              <Route path="/popularTags" component={Populartags} />
              <Route path="/popularUsers" component={Popularusers} />
              <Route path="/question/:qid" component={Question} />
              <Route path="/editQuestion/:qid" component={EditQuestion} />
              <Route path="/user/:_id" component={User} />
              <Route path="/questionsBy/:tag" component={QuestionsByTag} />
              <Route path="/askQuestion" component={AskQuestion} />
              <Route path="/" exact component={Topquestions} />
              <Route path="/about" component={About} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/search/:questionSearch" component={Searchq} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
