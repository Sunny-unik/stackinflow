import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/qls.css";
import Spinner from "../Spinner";
import handleDate from "../../helper/dateHelper";
import LikeButton from "./LikeButton";
import Answer from "./Answer";
import { updateUserPoints } from "../../action/userAction";

export default function Question(props) {
  const [question, setquestion] = useState("");
  const [questiondetail, setquestiondetail] = useState("");
  const [tag, settag] = useState([]);
  const [qdate, setqdate] = useState();
  const [qlikes, setqlikes] = useState([]);
  const [answers, setanswers] = useState([]);
  const [postanswer, setpostanswer] = useState();
  const [quser, setquser] = useState("");
  const [statechange, setstatechange] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const qid = props.match.params.qid;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question?id=` + qid)
      .then((res) => {
        console.log(res.data);
        setquestion(res.data.data.question);
        settag(res.data.data.tags);
        setqdate(res.data.data.date);
        setqlikes(res.data.data.qlikes);
        setanswers(res.data.data.answers);
        setquser(res.data.data.userId);
        setquestiondetail(res.data.data.questiondetail);
      })
      .catch((err) => console.log("In question fetch: ", err));
  }, [qid]);

  const listanswer = () => {
    if (user === null) {
      alert("For submit your answer you need to login first");
    } else {
      if (postanswer.length > 10) {
        const a = [];
        answers.forEach((o) => a.push(o.answer));
        if (a.includes(postanswer) !== true) {
          const userId = user._id;
          const answerObj = { userId, answer: postanswer, qid };
          axios
            .post(`${process.env.REACT_APP_API_URL}/answer/`, answerObj)
            .then((res) => {
              if (res.data.msg === "Answer Submitted") {
                setanswers((answers) => [...answers, res.data.data]);
                let userpoint = user.userlikes + 10;
                userpoint < 0 && (userpoint = 0);
                if (user._id !== quser._id)
                  dispatch(updateUserPoints(userId, userpoint));
              } else {
                alert("post answer failure because of some server side error");
              }
            });
          document.getElementById("thanksforanswer").style.display = "block";
          setstatechange(statechange + 1 + 1);
        } else {
          alert("This answer is already posted.");
        }
      } else {
        alert("Your answer is too short please explain in detail");
      }
    }
  };

  const questionLikeClick = () => {
    if (!user) {
      alert("for do this action you need to login first");
    } else if (qlikes.includes(user._id) === true) {
      const indexforpop = qlikes.indexOf(user._id);
      setqlikes(qlikes.splice(indexforpop, 1));
      setstatechange(statechange + 1 + 1);
      const removeqlike = { qid, qlikes };
      axios
        .post(`${process.env.REACT_APP_API_URL}/remove-qlike`, removeqlike)
        .then((res) => {
          console.log(res.data.data);
        });
    } else {
      const uid = user._id;
      setqlikes(qlikes.push(uid));
      const addqlike = { uid, qid };
      axios
        .post(`${process.env.REACT_APP_API_URL}/add-qlike`, addqlike)
        .then((res) => console.log(res.data.data));
      setstatechange(statechange + 1 + 1);
    }
  };

  const deleteQuestion = () => {
    const deleteQues = { qid };
    axios
      .post(`${process.env.REACT_APP_API_URL}/delete-question`, deleteQues)
      .then((res) => {
        if (res.data.status === "ok") {
          const userdname = user._id;
          let userpoint = user.userlikes - 5;
          if (userpoint < 0) {
            userpoint = 0;
          }
          const uid = { userdname, userpoint };
          axios
            .post(`${process.env.REACT_APP_API_URL}/update-user-point`, uid)
            .then((res) => console.log(res.data.data));
          if (ausernames.length > 0) {
            ausernames.forEach((e) => {
              const userdname = e;
              if (user._id !== e) {
                const auser = undefined;
                let userpoint = auser.userlikes - 10;
                if (userpoint < 0) {
                  userpoint = 0;
                }
                const uid = { userdname, userpoint };
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/update-user-point`,
                    uid
                  )
                  .then((res) => console.log(res.data.data + " alikes"));
              }
            });
          }
          alert(res.data.data);
          props.history.push("/");
        }
      });
  };

  let qd = questiondetail.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  const ausernames = answers.map((a) => a.uid);

  return question ? (
    <div>
      {/* question division */}
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <div className="px-2 h2" style={{ textShadow: ".01em .02em yellow" }}>
            Q. {question}
          </div>
          <LikeButton
            uid={user?._id}
            likesCount={qlikes}
            likeClick={questionLikeClick}
          />
        </div>
        <h5 className="px-2 my-1">
          {qd.split("<br/>").map((item) => (
            <p>{item}</p>
          ))}
        </h5>
        <div className="float-end m-1">
          Asked By{" "}
          <NavLink style={{ fontFamily: "cursive" }} to={`/user/${quser?._id}`}>
            {quser?.dname}
          </NavLink>
          {handleDate(qdate) !== 0
            ? " on " + handleDate(qdate) + " day ago"
            : "today"}
          .
        </div>
      </div>
      <hr className="col-sm-12" />
      {/* delete, edit & copy question link */}
      <div className="col-sm-12 px-2">
        {user != null && user?._id === quser?._id && (
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
        {user != null && user?._id === quser?._id && (
          <NavLink
            className="btn btn-outline-primary mx-3"
            to={{
              pathname: `/editQuestion/${qid}`,
              questionTitle: question,
              questionDetails: questiondetail,
              questionTags: tag
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
      {answers.length ? (
        <div>
          <h3 className="p-2"> Given Answers </h3>
          {answers.map((a) => (
            <Answer key={a._id} answerObj={a} user={user} answerId={a._id} />
          ))}
        </div>
      ) : (
        <h3 className="text-secondary px-2">
          <b>No answer given</b>
        </h3>
      )}
      {/* add answer */}
      <div>
        <h3 className="m-2 mb-0">Add Your Answer</h3>
        <div className="col-sm-12 p-2">
          <textarea
            className="w-100 "
            id="setAnswer"
            onChange={(e) => setpostanswer(e.target.value)}
            style={{ height: "36vh" }}
          ></textarea>
        </div>
        <div className="col-sm-12 p-2">
          <button
            type="reset"
            onClick={listanswer}
            className="btn btn-success float-end postans"
          >
            Post Answer
          </button>
        </div>
      </div>
      {/* thanks on post */}
      <div
        className="col-sm-12 bg-danger mb-2 px-2 p-1 mt-5 text-info"
        id="thanksforanswer"
        style={{ display: "none" }}
      >
        Thanks for contributing an answer to Stackinflow!
        <br />
        Please be sure to answer the question. Provide details and share your
        research!
        <br />
        But avoid …<br />
        <br />
        Asking for help, clarification, or responding to other answers.
        <br />
        Making statements based on opinion; back them up with references or
        personal experience.
      </div>
      <br />
      <div className="col-sm-12 px-2 h3" style={{ margin: "1rem 0rem" }}>
        Browse other questions tagged {/* attached tag on question's links */}
        {tag.map((o) => {
          return o.trim() ? (
            <NavLink
              style={{ fontFamily: "monospace" }}
              className="btn btn-link btn-outline-dark m-1"
              to={`/questionsBy/${o}`}
            >
              {o}
            </NavLink>
          ) : (
            ""
          );
        })}
        {/* askQuestion link if user loged in else login link */}
        {user ? (
          <span>
            &nbsp;or{" "}
            <NavLink
              style={{ fontFamily: "monospace" }}
              className="btn btn-primary ayoq"
              to={`/AskQuestion`}
            >
              ask you questions.
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
    </div>
  ) : (
    <Spinner />
  );
}
