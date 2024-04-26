import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/qls.css";
import Spinner from "../loadings/Spinner";
import handleDate from "../../helper/dateHelper";
import LikeButton from "./LikeButton";
import Answer from "./Answer";
import { updateUserPoints } from "../../action/userAction";
import Error from "../Error";

export default function Question(props) {
  const [question, setQuestion] = useState({
    data: null,
    loading: true,
    error: null
  });
  const [answers, setAnswers] = useState([]);
  const [postAnswer, setPostAnswer] = useState("");
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const qid = props.match.params.qid;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question?id=` + qid)
      .then((res) =>
        setQuestion({ data: res.data.data, loading: false, error: null })
      )
      .catch((error) => {
        setQuestion({ error, loading: false, data: null });
      });
  }, [qid]);

  const listAnswer = () => {
    if (user === null) {
      alert("For submit your answer you need to login first");
    } else {
      if (postAnswer.length > 10) {
        const a = [];
        answers.forEach((o) => a.push(o.answer));
        if (a.includes(postAnswer) !== true) {
          const userId = user._id;
          const answerObj = { userId, answer: postAnswer, qid };
          axios
            .post(`${process.env.REACT_APP_API_URL}/answer/`, answerObj)
            .then((res) => {
              if (res.data.msg === "Answer Submitted") {
                setAnswers((answers) => [...answers, res.data.data]);
                let userPoint = user.userlikes + 10;
                userPoint < 0 && (userPoint = 0);
                if (user._id !== question.data.userId._id)
                  dispatch(updateUserPoints(userId, userPoint));
              } else {
                alert("post answer failure because of some server side error");
              }
            });
          document.getElementById("thanksForAnswer").style.display = "block";
        } else {
          alert("This answer is already posted.");
        }
      } else {
        alert("Your answer is too short please explain in detail");
      }
    }
  };

  const questionLikeClick = () => {
    if (!user) return alert("for do this action you need to login first");
    axios
      .put(`${process.env.REACT_APP_API_URL}/question/qlikes`, {
        id: question.data._id,
        userId: user._id
      })
      .then((res) => {
        if (res.data.errors) return alert("Server error try again later");
        setQuestion({ data: res.data.data, loading: false, error: null });
      })
      .catch(() => alert("Server error try again later"));
  };

  const deleteQuestion = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/question/?id=${qid}`)
      .then((res) => {
        alert(res.data.msg);
        props.history.push("/");
      })
      .catch(() => alert("Unable perform that action, try again later."));
  };

  return !question.loading ? (
    <>
      {question.data ? (
        <>
          {/* question division */}
          <div>
            <div className="d-flex justify-content-between align-item-center">
              <div
                className="px-2 h2"
                style={{ textShadow: ".01em .02em yellow" }}
              >
                Q. {question.data.question}
              </div>
              <LikeButton
                uid={user?._id}
                qlikes={question.data.qlikes}
                likeClick={questionLikeClick}
              />
            </div>
            <h5 className="px-2 my-1">
              {question.data.questiondetail
                .replace(/(?:\r\n|\r|\n)/g, "<br/>")
                .split("<br/>")
                .map((item, i) => (
                  <p key={"questionDescriptionPara-" + i}>{item}</p>
                ))}
            </h5>
            <div className="float-end m-1">
              Asked By{" "}
              <NavLink
                style={{ fontFamily: "cursive" }}
                to={`/user/${question.data.userId?._id}`}
              >
                {question.data.userId?.dname}
              </NavLink>
              {handleDate(question.data.date) !== 0
                ? " on " + handleDate(question.data.date) + " day ago"
                : "today"}
              .
            </div>
          </div>
          <hr className="w-100" />
          {/* delete, edit & copy question link */}
          <div className="w-100 px-2">
            {user != null && user?._id === question.data.userId?._id && (
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure to delete this question?")) {
                    deleteQuestion();
                  }
                }}
              >
                Delete Question
              </button>
            )}
            {user != null && user?._id === question.data.userId?._id && (
              <NavLink
                className="btn btn-outline-primary mx-3"
                to={{
                  pathname: `/question/${qid}/edit`,
                  questionTitle: question,
                  questionDetails: question.data.questiondetail,
                  questionTags: question.data.tag
                }}
              >
                Edit Question
              </NavLink>
            )}
            <button
              className="btn btn-outline-dark mx-1 float-end"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.REACT_APP_API_URL}/question/${qid}`
                );
              }}
            >
              Copy Link
            </button>
          </div>
          {/* list answers or no answer message */}
          {question.data.answers?.length ? (
            <div>
              <h3 className="p-2"> Given Answers </h3>
              {question.data.answers.map((a) => (
                <Answer
                  key={a._id}
                  answerObj={a}
                  user={user}
                  answerId={a._id}
                />
              ))}
            </div>
          ) : (
            <h3 className="text-secondary px-2 mt-2">No answer given</h3>
          )}
          {/* add answer */}
          <div>
            <h3 className="m-2 mb-0">Add Your Answer</h3>
            <div className="col-sm-12 p-2">
              <textarea
                className="w-100 "
                id="setAnswer"
                onChange={(e) => setPostAnswer(e.target.value)}
                style={{ height: "36vh" }}
              ></textarea>
            </div>
            <div className="col-sm-12 p-2">
              <button
                type="reset"
                onClick={listAnswer}
                className="btn btn-success float-end postans"
              >
                Post Answer
              </button>
            </div>
          </div>
          {/* thanks on post */}
          <p
            className="w-100 bg-danger mb-2 px-2 p-1 mt-5 text-white fw-bold rounded"
            id="thanksForAnswer"
            style={{ display: "none" }}
          >
            Thanks for contributing an answer to Stackinflow!
            <br />
            Please be sure to answer the question. Provide details and share
            your research!
            <br />
            But avoid …<br />
            <br />
            Asking for help, clarification, or responding to other answers.
            <br />
            Making statements based on opinion; back them up with references or
            personal experience.
          </p>
          <br />
          <div className="col-sm-12 px-2 h3" style={{ margin: "1rem 0rem" }}>
            Browse other questions tagged{" "}
            {/* attached tag on question's links */}
            {question.data.tags.map((o, i) => {
              return (
                <NavLink
                  style={{ fontFamily: "monospace" }}
                  className="btn btn-link btn-outline-dark m-1"
                  to={`/tagged/${o}`}
                  key={"attachedTag-" + i}
                >
                  {o}
                </NavLink>
              );
            })}
            {/* askQuestion link if user logged in else login link */}
            {user ? (
              <span>
                or{" "}
                <NavLink
                  style={{ fontFamily: "monospace" }}
                  className="btn btn-primary"
                  to={`/question/create`}
                >
                  ask your questions.
                </NavLink>
              </span>
            ) : (
              <span>
                or{" "}
                <NavLink className="btn btn-primary" to={"/login"}>
                  login
                </NavLink>{" "}
                for ask your questions.
              </span>
            )}
          </div>
        </>
      ) : (
        <Error />
      )}
    </>
  ) : (
    <Spinner />
  );
}
