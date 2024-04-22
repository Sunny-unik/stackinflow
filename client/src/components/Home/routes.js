import About from "../About";
import AllQuestions from "../AllQuestions";
import AskQuestion from "../AskQuestion";
import Feedback from "../Feedback";
import Question from "../OpenedQuestion";
import PopularTags from "../PopularTags";
import PopularUsers from "../PopularUsers";
import QuestionsByTag from "../QuestionsByTag";
import TopQuestions from "../TopQuestions";
import User from "../User";
import SearchQuestion from "../SearchQuestion";

const routes = [
  { path: "/questions", component: AllQuestions },
  { path: "/tags", component: PopularTags },
  { path: "/users", component: PopularUsers },
  { path: "/question/create", component: AskQuestion },
  { path: "/question/:qid/edit", component: AskQuestion },
  { path: "/question/:qid", component: Question },
  { path: "/user/:dname", component: User },
  { path: "/tagged/:tag", component: QuestionsByTag },
  { path: "/about", component: About },
  { path: "/feedback", component: Feedback },
  { path: "/request/:type", component: Feedback },
  { path: "/search/:questionSearch", component: SearchQuestion },
  { path: "/search/", component: SearchQuestion },
  { path: "/", component: TopQuestions }
];

export default routes;
