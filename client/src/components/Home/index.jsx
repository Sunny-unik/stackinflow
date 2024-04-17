import { useSelector } from "react-redux";
import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import PopularTags from "../PopularTags";
import PopularUsers from "../PopularUsers";
import AskQuestion from "../AskQuestion";
import AllQuestions from "../AllQuestions";
import TopQuestions from "../TopQuestions";
import Question from "../OpenedQuestion";
import Footer from "../Footer";
import User from "../User";
import QuestionsByTag from "../QuestionsByTag";
import About from "../About";
import Feedback from "../Feedback";
import SearchQuestion from "../SearchQuestion";
import { FaHome, FaTags, FaUsers } from "react-icons/fa";
import { RiQuestionnaireFill } from "react-icons/ri";
import { TbPencilQuestion } from "react-icons/tb";

export default function Home(props) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="container-xl">
        <div className="row justify-content-center">
          <ul id="sideLeftNav" className="col-xl-1 col-sm-2 p-0">
            <li className="nav-link px-xl-0 px-3">
              <NavLink exact to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li className="nav-link px-xl-0 px-3">
              <NavLink to="/questions">
                <RiQuestionnaireFill /> Questions
              </NavLink>
            </li>
            <li className="nav-link px-xl-0 px-3">
              <NavLink to="/popularTags">
                <FaTags /> Tags
              </NavLink>
            </li>
            <li className="nav-link px-xl-0 px-3">
              <NavLink to="/popularUsers">
                <FaUsers /> Users
              </NavLink>
            </li>
            <li className="nav-link px-xl-0 px-3">
              <div
                className="extraLink"
                onClick={() =>
                  user
                    ? props.history.push("/askQuestion")
                    : alert("You need to login first")
                }
              >
                <TbPencilQuestion /> Ask Question
              </div>
            </li>
          </ul>
          <div
            className="col-xl-10 col-sm-10 p-0 overflow-hidden border border-primary"
            id="mainSection"
          >
            <Switch>
              <Route path="/questions" component={AllQuestions} />
              <Route path="/popularTags" component={PopularTags} />
              <Route path="/popularUsers" component={PopularUsers} />
              <Route path="/question/:qid" component={Question} />
              <Route path="/editQuestion/:qid" component={AskQuestion} />
              <Route path="/user/:_id" component={User} />
              <Route path="/questionsBy/:tag" component={QuestionsByTag} />
              <Route path="/askQuestion" component={AskQuestion} />
              <Route path="/" exact component={TopQuestions} />
              <Route path="/about" component={About} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/request/:type" component={Feedback} />
              <Route
                path="/search/:questionSearch"
                component={SearchQuestion}
              />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
