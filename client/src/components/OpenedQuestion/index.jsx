import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/qls.css";
import Spinner from "../loadings/Spinner";
import OverlayLoading from "../loadings/OverlayLoading";
import handleDate from "../../helper/dateHelper";
import LikeButton from "./LikeButton";
import Answer from "./Answer";
import Error from "../Error";
import { authenticateUser } from "../../action/userAction";

export default function Question(props) {
  const [question, setQuestion] = useState({
    data: null,
    loading: true,
    error: null
  });
  const [postAnswer, setPostAnswer] = useState("");
  const { user } = useSelector((state) => state);
  const qid = props.match.params.qid;
  const thanksDivRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question?id=` + qid)
      .then((res) =>
        setQuestion({ data: res.data.data, loading: false, error: null })
      )
      .catch((error) => setQuestion({ error, loading: false, data: null }));
  }, [qid]);

  const listAnswer = async () => {
    if (!user) return alert("For submit your answer you need to login first");
    if (postAnswer.trim().length > 10) {
      const existingUserNames = question.data.answers.map((o) => o.userId._id);
      if (!existingUserNames.includes(user._id)) {
        const answerObj = { answer: postAnswer, qid, userId: user._id };
        try {
          setQuestion({ ...question, loading: true });
          const answerPostRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/answer/`,
            answerObj
          );
          if (answerPostRes.data.data) {
            setQuestion({
              loading: false,
              error: null,
              data: {
                ...question.data,
                answers: [...question.data.answers, answerPostRes.data.data]
              }
            });
            thanksDivRef.current.style.display = "";
            dispatch(authenticateUser());
          } else {
            setQuestion({ ...question, loading: false });
            alert("Post answer failed because of some server error");
          }
        } catch (error) {
          setQuestion({ ...question, loading: false });
          alert("Server error, try again later");
        }
      } else alert("Users are not allowed to post more than 1 answer");
    } else alert("Your answer is too short please explain in more detail");
  };

  const questionLikeClick = () => {
    if (!user) return alert("For do this action you need to login first");
    axios
      .put(`${process.env.REACT_APP_API_URL}/question/qlikes`, {
        id: question.data._id,
        userId: user._id
      })
      .then((res) => {
        if (res.data.errors) return alert("Server error try again later");
        setQuestion((prevState) => {
          return {
            data: {
              ...res.data.data,
              answers: prevState.data.answers,
              userId: prevState.data.userId
            },
            loading: false,
            error: null
          };
        });
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
      {question.loading && <OverlayLoading />}
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
                .replace(/(?:\r\n|\r|\n)/g, "\n")
                .split("\n")
                .map((item, i) => (
                  <p className="mb-0" key={"questionDescriptionPara-" + i}>
                    {item}
                  </p>
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
                : " today"}
              .
            </div>
          </div>
          <hr className="w-100" />
          {/* delete, edit & copy question link */}
          <div className="w-100 px-2">
            {user != null && user?._id === question.data.userId?._id && (
              <button
                className="btn btn-outline-danger mb-2"
                onClick={() => {
                  if (window.confirm("Are you sure to delete this question?"))
                    deleteQuestion();
                }}
              >
                Delete Question
              </button>
            )}
            {user != null && user?._id === question.data.userId?._id && (
              <NavLink
                className="btn btn-outline-primary m-2 mt-0"
                to={{
                  pathname: `/question/${qid}/edit`,
                  questionTitle: question.data.question,
                  questionDetails: question.data.questiondetail,
                  questionTags: question.data.tags
                }}
              >
                Edit Question
              </NavLink>
            )}
            <button
              className="btn btn-outline-dark mx-1 float-end"
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              Copy Link
            </button>
          </div>
          {/* list answers or no answer message */}
          {question.data.answers?.length ? (
            <div>
              <h3 className="p-2"> Given Answers </h3>
              <div className="d-grid gap-2">
                {question.data.answers.map((a) => (
                  <Answer
                    key={a._id}
                    answerObj={a}
                    userId={user?._id}
                    setQuestion={setQuestion}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h3 className="text-secondary px-2 mt-2">
              Not any answer is listed
            </h3>
          )}
          {/* add answer */}
          <div>
            <div className="col-sm-12 p-2">
              <textarea
                className="w-100 p-2 rounded mt-2"
                id="setAnswer"
                onChange={(e) => setPostAnswer(e.target.value.trim())}
                style={{ height: "36vh" }}
                placeholder="Add Your Answer"
              ></textarea>
            </div>
            <div className="col-sm-12 p-2">
              <button
                type="reset"
                onClick={listAnswer}
                className="btn btn-success float-end likeButton rounded"
              >
                Post Answer
              </button>
            </div>
          </div>
          {/* thanks on post */}
          <p
            className="bg-secondary mb-2 p-2 mt-5 mx-2 text-white fw-bold rounded"
            ref={thanksDivRef}
            style={{ display: "none" }}
          >
            <button
              className="bg-transparent border-0 rounded float-end fw-bold text-warning pointer"
              onClick={() => (thanksDivRef.current.style.display = "none")}
            >
              X
            </button>
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
